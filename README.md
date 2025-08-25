# schnittwerk-your-style — Deployment notes

This repository contains a Vite + React frontend in `frontend/` and an Express + SQLite backend in `backend/`.

Quick Netlify deploy (Frontend)

- Netlify can build and publish the frontend automatically. `netlify.toml` is included and publishes `frontend/dist`.
- In Netlify site settings use:
  - Build command: `npm --prefix frontend run build`
  - Publish directory: `frontend/dist`

Or build locally and drag & drop the contents of `frontend/dist` into Netlify.

Backend (VPS) — minimal

- Use PM2 or systemd to run the backend (example in `backend/README.md`). Ensure `backend/.env` is configured with real SMTP and `JWT_SECRET`.

Production checklist

- [ ] Set strong `JWT_SECRET` in `backend/.env`
- [ ] Set real SMTP credentials
- [ ] Change admin password immediately after migration
- [ ] Secure `.env` (do not commit to Git)
- [ ] Setup TLS on the backend (nginx + certbot) if exposing the backend directly
- [ ] Regular DB backups for `backend/booking.sqlite`


