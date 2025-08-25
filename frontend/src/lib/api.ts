const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
const TENANT = import.meta.env.VITE_TENANT || 'schnittwerk';

async function fetchJson(path: string, opts: RequestInit = {}){
  const res = await fetch(`${API_BASE}${path}` , opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getServices(){
  return fetchJson(`/${TENANT}/services`);
}

export async function getStaff(){
  return fetchJson(`/${TENANT}/staff`);
}

export async function getAvailability(params:{date:string, serviceId:number, staffId?:number}){
  const url = new URL(`${API_BASE}/${TENANT}/availability`);
  url.searchParams.set('date', params.date);
  url.searchParams.set('serviceId', String(params.serviceId));
  if (params.staffId) url.searchParams.set('staffId', String(params.staffId));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function book(body:{ serviceId:number; staffId:number; date:string; startTime:string; customer:{name:string; email:string; phone?:string} }){
  return fetchJson(`/${TENANT}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// Admin helpers: token is the admin token string
function adminHeaders(token?:string){
  return token ? { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type':'application/json' };
}

export async function adminGetAppointments(token?:string, date?:string){
  const params = date ? `?date=${encodeURIComponent(date)}` : '';
  const res = await fetch(`${API_BASE}/${TENANT}/admin/appointments${params}`, { headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminDeleteAppointment(token:string, id:number){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/appointments/${id}`, { method: 'DELETE', headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminCreateService(token:string, body:{name:string,duration_min:number,price_cents:number}){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/services`, { method:'POST', headers: adminHeaders(token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminUpdateService(token:string, id:number, body:{name?:string,duration_min?:number,price_cents?:number}){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/services/${id}`, { method:'PUT', headers: adminHeaders(token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminDeleteService(token:string, id:number){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/services/${id}`, { method:'DELETE', headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminGetStaff(token:string){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/staff`, { headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminCreateStaff(token:string, body:{name:string}){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/staff`, { method:'POST', headers: adminHeaders(token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminUpdateStaff(token:string, id:number, body:{name?:string}){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/staff/${id}`, { method:'PUT', headers: adminHeaders(token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminDeleteStaff(token:string, id:number){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/staff/${id}`, { method:'DELETE', headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminGetOpenings(token:string){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/openings`, { headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminLogin(username:string, password:string){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, password }) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminCreateOpening(token:string, body:{weekday:number,start_time:string,end_time:string}){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/openings`, { method:'POST', headers: adminHeaders(token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminUpdateOpening(token:string, id:number, body:{weekday?:number,start_time?:string,end_time?:string}){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/openings/${id}`, { method:'PUT', headers: adminHeaders(token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminDeleteOpening(token:string, id:number){
  const res = await fetch(`${API_BASE}/${TENANT}/admin/openings/${id}`, { method:'DELETE', headers: adminHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default { getServices, getStaff, getAvailability, book,
  adminGetAppointments, adminDeleteAppointment, adminCreateService, adminUpdateService, adminDeleteService,
  adminGetStaff, adminCreateStaff, adminUpdateStaff, adminDeleteStaff,
  adminGetOpenings, adminCreateOpening, adminUpdateOpening, adminDeleteOpening,
  adminLogin };
