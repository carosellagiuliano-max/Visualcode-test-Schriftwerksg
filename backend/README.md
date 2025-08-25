# Backend (Booking API)

Kurzanleitung

1. Node.js installieren (falls noch nicht vorhanden)
2. Im `backend`-Ordner: `npm install`
3. Konfiguration: `.env` Datei anlegen mit SMTP und optional PORT, z.B.

```
PORT=4000
FROM_EMAIL=no-reply@example.com
SALON_NOTIFY_EMAIL=owner@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_SECURE=false
```

4. Frontend bauen (optional, damit Backend es serviert):

```
cd ../frontend
npm install
npm run build
```

Der Build landet in `frontend/dist`. Wenn `frontend/dist` vorhanden ist, serviert das Backend die gebaute App unter http://localhost:4000.

5. Server starten:

```
cd backend
npm start
```

Endpunkte (Beispiel tenant `schnittwerk`)

- GET /api/schnittwerk/services
- GET /api/schnittwerk/staff
- GET /api/schnittwerk/availability?date=2025-08-26&serviceId=1
- POST /api/schnittwerk/book  (body mit serviceId, staffId, date, startTime, customer)

Hinweis: Die DB-Datei `booking.sqlite` wird automatisch erstellt und initialisiert.

## Admin API

Für das Admin-Portal gibt es zusätzliche Endpunkte, die per `ADMIN_TOKEN` geschützt sind.

Beispiel `.env` Eintrag:

```
ADMIN_TOKEN=mein_super_geheimes_token
FROM_EMAIL=no-reply@example.com
SALON_NOTIFY_EMAIL=owner@example.com
```

Beispiel-Requests (Header `x-admin-token: <token>` oder als `?admin_token=` Query):

- GET /api/schnittwerk/admin/appointments
- DELETE /api/schnittwerk/admin/appointments/:id
- POST /api/schnittwerk/admin/services { name, duration_min, price_cents }
- PUT /api/schnittwerk/admin/services/:id
- DELETE /api/schnittwerk/admin/services/:id
- Staff + Openings CRUD unter `/api/:tenant/admin/staff` und `/api/:tenant/admin/openings`

## Admin users and login

The backend now supports persistent admin users (stored in the `admin_users` table).
On first run a default user `admin` is created with the password from the `ADMIN_DEFAULT_PASSWORD` env var.

Login endpoint (returns a JWT):

- POST /api/:tenant/admin/login  { username, password }

Use the returned token for protected admin endpoints by sending `Authorization: Bearer <token>` header.

Set `JWT_SECRET` in your `.env` for production to sign tokens securely.

## Deployment notes

- Frontend: Netlify or Vercel are good choices for the built static site. Build the frontend with:

```
cd frontend
npm install
npm run build
```

Upload the contents of `frontend/dist` to Netlify (drag & drop) or configure the repo build command `npm run build` and publish folder `dist`.

- Backend: For small VPS deployments, use a process manager like PM2:

```
# on your VPS
cd /path/to/repo/backend
npm install
# create a .env with real SMTP and JWT_SECRET
pm2 start server.js --name schnittwerk-booking
pm2 save
```

Ensure ports and firewall rules allow incoming traffic, and optionally put a reverse proxy (nginx) in front for TLS.

