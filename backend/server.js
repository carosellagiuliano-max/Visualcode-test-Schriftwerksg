// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./db");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// kleine Info-Endpoints
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime(), env: process.env.NODE_ENV || 'development' });
});

// Serve built frontend if present (frontend built with Vite -> dist folder)
const clientDist = path.resolve(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  // For SPA routes, serve index.html for non-API GET requests without using wildcard route patterns
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    if (req.method !== 'GET') return next();
    // only serve index.html for requests that accept HTML
    const accepts = req.headers.accept || '';
    if (!accepts.includes('text/html') && !accepts.includes('*/*')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // simple root info when no built frontend is available
  app.get('/', (req, res) => {
    res.type('html').send(`<h1>Booking API</h1>
      <p>No built frontend found. Build the frontend and place it in <code>frontend/dist</code>.</p>
      <p>Available endpoints:</p>
      <ul>
        <li><a href="/api/schnittwerk/services">/api/schnittwerk/services</a></li>
        <li><a href="/api/schnittwerk/staff">/api/schnittwerk/staff</a></li>
        <li>/api/&lt;tenant&gt;/availability?date=YYYY-MM-DD&serviceId=1</li>
        <li>POST /api/&lt;tenant&gt;/book (JSON body)</li>
      </ul>`);
  });
}

// --- E-Mail Transporter ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// retry helper for emails
async function sendMailWithRetry(mailOptions, attempts = 3, baseDelay = 500){
  let lastErr;
  for (let i = 0; i < attempts; i++){
    try{
      return await transporter.sendMail(mailOptions);
    }catch(e){
      lastErr = e;
      console.error(`email attempt ${i+1} failed:`, e && e.message ? e.message : e);
      await new Promise(r => setTimeout(r, baseDelay * (i+1)));
    }
  }
  throw lastErr;
}

// --- kleine Hilfsfunktionen für Zeit ---
function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function minutesToTime(min) {
  const h = Math.floor(min / 60).toString().padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}
function weekdayOf(dateStr) {
  return new Date(dateStr + "T00:00:00").getDay();
}

// --- Endpunkte ---
// Dienstleistungen
app.get("/api/:tenant/services", (req, res) => {
  const { tenant } = req.params;
  const rows = db.prepare("SELECT id, name, duration_min, price_cents FROM services WHERE tenant_id = ?").all(tenant);
  res.json(rows);
});

// Mitarbeiter
app.get("/api/:tenant/staff", (req, res) => {
  const { tenant } = req.params;
  const rows = db.prepare("SELECT id, name FROM staff WHERE tenant_id = ?").all(tenant);
  res.json(rows);
});

// Verfügbare Slots
app.get("/api/:tenant/availability", (req, res) => {
  const { tenant } = req.params;
  const { date, serviceId, staffId } = req.query;
  if (!date || !serviceId) return res.status(400).json({ error: "date & serviceId required" });

  const service = db.prepare("SELECT duration_min FROM services WHERE id=? AND tenant_id=?").get(serviceId, tenant);
  if (!service) return res.status(404).json({ error: "service not found" });

  const wd = weekdayOf(date);
  const opening = db.prepare("SELECT start_time, end_time FROM openings WHERE tenant_id=? AND weekday=?").get(tenant, wd);
  if (!opening) return res.json({ slots: [] });

  const staffQuery = staffId
    ? db.prepare(`
        SELECT st.id, st.name FROM staff st
        JOIN staff_services ss ON ss.staff_id = st.id
        WHERE st.tenant_id=? AND st.id=? AND ss.service_id=?
      `).all(tenant, staffId, serviceId)
    : db.prepare(`
        SELECT st.id, st.name FROM staff st
        JOIN staff_services ss ON ss.staff_id = st.id
        WHERE st.tenant_id=? AND ss.service_id=?
      `).all(tenant, serviceId);

  const startMin = timeToMinutes(opening.start_time);
  const endMin = timeToMinutes(opening.end_time);
  const step = 15;
  const dur = service.duration_min;

  const appts = db.prepare(`
    SELECT staff_id, start_time, end_time 
    FROM appointments 
    WHERE tenant_id=? AND date=?
  `).all(tenant, date).map(a => ({
    staff_id: a.staff_id,
    start: timeToMinutes(a.start_time),
    end: timeToMinutes(a.end_time),
  }));

  const slots = [];
  for (const st of staffQuery) {
    for (let start = startMin; start + dur <= endMin; start += step) {
      const end = start + dur;
      const overlap = appts.some(a => a.staff_id === st.id && !(end <= a.start || start >= a.end));
      if (!overlap) {
        slots.push({
          staffId: st.id,
          staffName: st.name,
          start: minutesToTime(start),
          end: minutesToTime(end),
        });
      }
    }
  }
  res.json({ slots });
});

// Termin buchen
app.post("/api/:tenant/book", async (req, res) => {
  const { tenant } = req.params;
  const { serviceId, staffId, date, startTime, customer } = req.body;
  if (!serviceId || !staffId || !date || !startTime || !customer?.name || !customer?.email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const svc = db.prepare("SELECT duration_min, name FROM services WHERE id=? AND tenant_id=?").get(serviceId, tenant);
  if (!svc) return res.status(404).json({ error: "service not found" });

  const start = timeToMinutes(startTime);
  const endTime = minutesToTime(start + svc.duration_min);

  const clash = db.prepare(`
    SELECT 1 FROM appointments
    WHERE tenant_id=? AND staff_id=? AND date=? 
      AND NOT (? <= start_time OR ? >= end_time)
  `).get(tenant, staffId, date, startTime, endTime);
  if (clash) return res.status(409).json({ error: "Slot already booked" });

  const ins = db.prepare(`
    INSERT INTO appointments 
      (tenant_id, service_id, staff_id, date, start_time, end_time, customer_name, customer_email, customer_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(tenant, serviceId, staffId, date, startTime, endTime, customer.name, customer.email, customer.phone || null);

  const apptId = ins.lastInsertRowid;

  try {
    const subject = `Termin bestätigt – ${date} ${startTime}`;
    const html = `
      <div style="font-family:system-ui,Arial,sans-serif;color:#111">
        <p>Hallo ${customer.name},</p>
        <p>vielen Dank, Ihr Termin wurde bestätigt.</p>
        <table>
          <tr><td><strong>Datum</strong></td><td>${date}</td></tr>
          <tr><td><strong>Beginn</strong></td><td>${startTime}</td></tr>
          <tr><td><strong>Leistung</strong></td><td>${svc.name}</td></tr>
        </table>
        <p>Bei Fragen antworten Sie bitte auf diese E-Mail.</p>
      </div>
    `;
    await sendMailWithRetry({ from: process.env.FROM_EMAIL, to: customer.email, subject, html });
    await sendMailWithRetry({ from: process.env.FROM_EMAIL, to: process.env.SALON_NOTIFY_EMAIL, subject: `Neue Buchung – ${customer.name} (${date} ${startTime})`, html: `<p>Neue Buchung für ${svc.name} am ${date} um ${startTime}.</p>` });
  } catch (e) {
    console.error("Email error:", e);
  }

  res.json({ ok: true, appointmentId: apptId, endTime });
});

// --- Admin middleware (simple token auth) ---
// Admin auth: username/password -> JWT
app.post('/api/:tenant/admin/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username & password required' });
  const user = db.prepare('SELECT id, username, password_hash, display_name FROM admin_users WHERE username = ?').get(username);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET || 'dev_jwt_secret', { expiresIn: '12h' });
  res.json({ token, username: user.username, displayName: user.display_name });
});

function checkAdmin(req, res, next){
  const auth = req.header('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'missing token' });
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_jwt_secret');
    req.admin = payload;
    next();
  }catch(e){
    return res.status(401).json({ error: 'invalid token' });
  }
}

// List appointments (admin)
app.get('/api/:tenant/admin/appointments', checkAdmin, (req, res) => {
  const { tenant } = req.params;
  const { date } = req.query;
  const params = [tenant];
  let sql = `
    SELECT a.id, a.service_id, s.name AS service_name, a.staff_id, st.name AS staff_name,
           a.date, a.start_time, a.end_time, a.customer_name, a.customer_email, a.customer_phone, a.created_at
    FROM appointments a
    LEFT JOIN services s ON s.id = a.service_id
    LEFT JOIN staff st ON st.id = a.staff_id
    WHERE a.tenant_id = ?`;
  if (date) { sql += ' AND a.date = ?'; params.push(date); }
  sql += ' ORDER BY a.date, a.start_time';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

// Cancel / delete appointment (admin)
app.delete('/api/:tenant/admin/appointments/:id', checkAdmin, async (req, res) => {
  const { tenant, id } = req.params;
  const appt = db.prepare('SELECT * FROM appointments WHERE id = ? AND tenant_id = ?').get(id, tenant);
  if (!appt) return res.status(404).json({ error: 'appointment not found' });

  db.prepare('DELETE FROM appointments WHERE id = ? AND tenant_id = ?').run(id, tenant);

  // notify customer and salon optionally
  try{
    const subject = `Termin storniert – ${appt.date} ${appt.start_time}`;
    const html = `<p>Hallo ${appt.customer_name},</p><p>Ihr Termin am ${appt.date} um ${appt.start_time} wurde vom Salon storniert.</p>`;
    if (appt.customer_email) await transporter.sendMail({ from: process.env.FROM_EMAIL, to: appt.customer_email, subject, html });
    if (process.env.SALON_NOTIFY_EMAIL) await transporter.sendMail({ from: process.env.FROM_EMAIL, to: process.env.SALON_NOTIFY_EMAIL, subject: `Stornierung: ${appt.customer_name} ${appt.date} ${appt.start_time}`, html: `<pre>${JSON.stringify(appt,null,2)}</pre>` });
  }catch(e){ console.error('cancel email error', e); }

  res.json({ ok: true });
});

// Services CRUD (admin)
app.post('/api/:tenant/admin/services', checkAdmin, (req, res) => {
  const { tenant } = req.params;
  const { name, duration_min, price_cents } = req.body;
  if (!name || !duration_min || !price_cents) return res.status(400).json({ error: 'Missing fields' });
  const ins = db.prepare('INSERT INTO services (tenant_id, name, duration_min, price_cents) VALUES (?, ?, ?, ?)').run(tenant, name, duration_min, price_cents);
  res.json({ ok: true, id: ins.lastInsertRowid });
});

app.put('/api/:tenant/admin/services/:id', checkAdmin, (req, res) => {
  const { tenant, id } = req.params;
  const { name, duration_min, price_cents } = req.body;
  const cur = db.prepare('SELECT * FROM services WHERE id = ? AND tenant_id = ?').get(id, tenant);
  if (!cur) return res.status(404).json({ error: 'service not found' });
  db.prepare('UPDATE services SET name = ?, duration_min = ?, price_cents = ? WHERE id = ? AND tenant_id = ?')
    .run(name || cur.name, duration_min || cur.duration_min, price_cents || cur.price_cents, id, tenant);
  res.json({ ok: true });
});

app.delete('/api/:tenant/admin/services/:id', checkAdmin, (req, res) => {
  const { tenant, id } = req.params;
  const cur = db.prepare('SELECT * FROM services WHERE id = ? AND tenant_id = ?').get(id, tenant);
  if (!cur) return res.status(404).json({ error: 'service not found' });
  db.prepare('DELETE FROM services WHERE id = ? AND tenant_id = ?').run(id, tenant);
  // staff_services rows cascade due to ON DELETE CASCADE
  res.json({ ok: true });
});

// Staff CRUD (admin)
app.get('/api/:tenant/admin/staff', checkAdmin, (req, res) => {
  const { tenant } = req.params;
  const rows = db.prepare('SELECT id, name FROM staff WHERE tenant_id = ?').all(tenant);
  res.json(rows);
});

app.post('/api/:tenant/admin/staff', checkAdmin, (req, res) => {
  const { tenant } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const ins = db.prepare('INSERT INTO staff (tenant_id, name) VALUES (?, ?)').run(tenant, name);
  res.json({ ok: true, id: ins.lastInsertRowid });
});

app.put('/api/:tenant/admin/staff/:id', checkAdmin, (req, res) => {
  const { tenant, id } = req.params;
  const { name } = req.body;
  const cur = db.prepare('SELECT * FROM staff WHERE id = ? AND tenant_id = ?').get(id, tenant);
  if (!cur) return res.status(404).json({ error: 'staff not found' });
  db.prepare('UPDATE staff SET name = ? WHERE id = ? AND tenant_id = ?').run(name || cur.name, id, tenant);
  res.json({ ok: true });
});

app.delete('/api/:tenant/admin/staff/:id', checkAdmin, (req, res) => {
  const { tenant, id } = req.params;
  db.prepare('DELETE FROM staff WHERE id = ? AND tenant_id = ?').run(id, tenant);
  res.json({ ok: true });
});

// Openings (working hours) CRUD (admin)
app.get('/api/:tenant/admin/openings', checkAdmin, (req, res) => {
  const { tenant } = req.params;
  const rows = db.prepare('SELECT id, weekday, start_time, end_time FROM openings WHERE tenant_id = ? ORDER BY weekday').all(tenant);
  res.json(rows);
});

app.post('/api/:tenant/admin/openings', checkAdmin, (req, res) => {
  const { tenant } = req.params;
  const { weekday, start_time, end_time } = req.body;
  if (weekday == null || !start_time || !end_time) return res.status(400).json({ error: 'Missing fields' });
  const ins = db.prepare('INSERT INTO openings (tenant_id, weekday, start_time, end_time) VALUES (?, ?, ?, ?)').run(tenant, weekday, start_time, end_time);
  res.json({ ok: true, id: ins.lastInsertRowid });
});

app.put('/api/:tenant/admin/openings/:id', checkAdmin, (req, res) => {
  const { tenant, id } = req.params;
  const { weekday, start_time, end_time } = req.body;
  const cur = db.prepare('SELECT * FROM openings WHERE id = ? AND tenant_id = ?').get(id, tenant);
  if (!cur) return res.status(404).json({ error: 'opening not found' });
  db.prepare('UPDATE openings SET weekday = ?, start_time = ?, end_time = ? WHERE id = ? AND tenant_id = ?')
    .run(weekday ?? cur.weekday, start_time ?? cur.start_time, end_time ?? cur.end_time, id, tenant);
  res.json({ ok: true });
});

app.delete('/api/:tenant/admin/openings/:id', checkAdmin, (req, res) => {
  const { tenant, id } = req.params;
  db.prepare('DELETE FROM openings WHERE id = ? AND tenant_id = ?').run(id, tenant);
  res.json({ ok: true });
});

// Server starten
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Booking API läuft auf http://localhost:${PORT}`));
