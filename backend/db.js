// backend/db.js
const Database = require("better-sqlite3");
const path = require("path");
const dbFile = path.resolve(__dirname, "booking.sqlite");
const db = new Database(dbFile);

// Tabellen anlegen
db.exec(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  duration_min INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS staff_services (
  staff_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  PRIMARY KEY (staff_id, service_id),
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS openings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  weekday INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time   TEXT NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  service_id INTEGER NOT NULL,
  staff_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (staff_id) REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT
);
`);

// Seed-Daten (nur beim ersten Start)
try {
  const row = db.prepare("SELECT COUNT(*) AS n FROM tenants").get();
  const hasTenant = row && row.n > 0;
  if (!hasTenant) {
    db.prepare("INSERT INTO tenants (id, name) VALUES (?, ?)").run("schnittwerk", "Schnittwerk SG");

    const s1 = db.prepare("INSERT INTO services (tenant_id, name, duration_min, price_cents) VALUES (?, ?, ?, ?)")
      .run("schnittwerk", "Herren Haarschnitt", 45, 5500).lastInsertRowid;
    const s2 = db.prepare("INSERT INTO services (tenant_id, name, duration_min, price_cents) VALUES (?, ?, ?, ?)")
      .run("schnittwerk", "Damen Haarschnitt", 60, 8500).lastInsertRowid;

    const st1 = db.prepare("INSERT INTO staff (tenant_id, name) VALUES (?, ?)").run("schnittwerk", "Lena").lastInsertRowid;
    const st2 = db.prepare("INSERT INTO staff (tenant_id, name) VALUES (?, ?)").run("schnittwerk", "Marco").lastInsertRowid;

    db.prepare("INSERT INTO staff_services (staff_id, service_id) VALUES (?, ?)").run(st1, s1);
    db.prepare("INSERT INTO staff_services (staff_id, service_id) VALUES (?, ?)").run(st1, s2);
    db.prepare("INSERT INTO staff_services (staff_id, service_id) VALUES (?, ?)").run(st2, s1);

    const openStmt = db.prepare("INSERT INTO openings (tenant_id, weekday, start_time, end_time) VALUES (?, ?, ?, ?)");
    for (let wd = 1; wd <= 5; wd++) openStmt.run("schnittwerk", wd, "09:00", "18:00");
    openStmt.run("schnittwerk", 6, "09:00", "14:00");

    // create a default admin user if none exists
    const crypto = require('crypto');
    const bcrypt = require('bcryptjs');
    const adminName = 'admin';
    const adminPass = process.env.ADMIN_DEFAULT_PASSWORD || 'admin1234';
    const passHash = bcrypt.hashSync(adminPass, 10);
    db.prepare('INSERT OR IGNORE INTO admin_users (username, password_hash, display_name) VALUES (?, ?, ?)')
      .run(adminName, passHash, 'Administrator');
  }
} catch (err) {
  // Falls Tabelle noch nicht existiert oder andere Fehler, logge und rethrow
  console.error("DB seed error:", err);
  throw err;
}

module.exports = db;
