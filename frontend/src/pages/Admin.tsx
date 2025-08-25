import React, { useState, useEffect } from 'react';
import api from '../lib/api';

function Field({label, children}:{label:string, children:any}){
  return (<div style={{marginBottom:8}}><label style={{display:'block',fontWeight:600}}>{label}</label>{children}</div>);
}

export default function Admin(){
  const [token, setToken] = useState(localStorage.getItem('adminToken')||'');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'appointments'|'services'|'staff'|'openings'>('appointments');
  const [dateFilter, setDateFilter] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [openings, setOpenings] = useState<any[]>([]);

  useEffect(()=>{ if (token) loadAll(); },[token, tab]);

  async function login(){
    try{
      const res = await api.adminLogin(username, password);
      setToken(res.token); localStorage.setItem('adminToken', res.token);
      setPassword('');
    }catch(e:any){ alert('Login failed: '+(e.message||e)); }
  }

  async function logout(){ localStorage.removeItem('adminToken'); setToken(''); }

  async function loadAll(){
    try{
      if (tab==='appointments') setAppointments(await api.adminGetAppointments(token, dateFilter));
      if (tab==='services') setServices(await (await fetch(`${location.origin}/api/schnittwerk/services`)).json());
      if (tab==='staff') setStaff(await api.adminGetStaff(token));
      if (tab==='openings') setOpenings(await api.adminGetOpenings(token));
    }catch(e:any){ alert('Fehler: '+(e.message||e)); }
  }

  async function cancel(id:number){ if (!confirm('Termin stornieren?')) return; await api.adminDeleteAppointment(token, id); loadAll(); }

  // Services form
  const [svcName, setSvcName] = useState('');
  const [svcDur, setSvcDur] = useState(30);
  const [svcPrice, setSvcPrice] = useState(2500);
  async function createService(){
    if (!svcName) return alert('Name required');
    await api.adminCreateService(token, { name: svcName, duration_min: Number(svcDur), price_cents: Number(svcPrice) });
    setSvcName(''); setSvcDur(30); setSvcPrice(2500); loadAll();
  }

  // Staff form
  const [staffName, setStaffName] = useState('');
  async function createStaff(){ if (!staffName) return alert('Name needed'); await api.adminCreateStaff(token, { name: staffName }); setStaffName(''); loadAll(); }

  // Openings form
  const [opWd, setOpWd] = useState(1);
  const [opStart, setOpStart] = useState('09:00');
  const [opEnd, setOpEnd] = useState('18:00');
  async function createOpening(){ await api.adminCreateOpening(token, { weekday: Number(opWd), start_time: opStart, end_time: opEnd }); loadAll(); }

  if (!token) return (
    <div style={{padding:20,maxWidth:640}}>
      <h1>Admin Login</h1>
      <Field label="Benutzername"><input value={username} onChange={e=>setUsername(e.target.value)} /></Field>
      <Field label="Passwort"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></Field>
      <div><button onClick={login}>Login</button></div>
    </div>
  );

  return (
    <div style={{padding:20}}>
      <h1>Admin</h1>
      <div style={{marginBottom:12}}>
        <button onClick={()=>setTab('appointments')}>Termine</button>
        <button onClick={()=>setTab('services')}>Services</button>
        <button onClick={()=>setTab('staff')}>Mitarbeiter</button>
        <button onClick={()=>setTab('openings')}>Öffnungszeiten</button>
        <button onClick={logout} style={{marginLeft:12}}>Logout</button>
      </div>

      {tab==='appointments' && (
        <div>
          <h2>Termine</h2>
          <div style={{marginBottom:8}}>Datum filtern: <input type="date" value={dateFilter} onChange={e=>setDateFilter(e.target.value)} /> <button onClick={loadAll}>Filter</button></div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr><th>Datum</th><th>Zeit</th><th>Service</th><th>Kunde</th><th>Email</th><th></th></tr></thead>
            <tbody>
              {appointments.map(a=> (
                <tr key={a.id}><td>{a.date}</td><td>{a.start_time}</td><td>{a.service_name}</td><td>{a.customer_name}</td><td>{a.customer_email}</td><td><button onClick={()=>cancel(a.id)}>Stornieren</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab==='services' && (
        <div>
          <h2>Services</h2>
          <div style={{display:'flex',gap:12}}>
            <div style={{flex:1}}>
              <Field label="Name"><input value={svcName} onChange={e=>setSvcName(e.target.value)} /></Field>
              <Field label="Dauer (Min)"><input type="number" value={svcDur} onChange={e=>setSvcDur(Number(e.target.value))} /></Field>
              <Field label="Preis (Cents)"><input type="number" value={svcPrice} onChange={e=>setSvcPrice(Number(e.target.value))} /></Field>
              <div><button onClick={createService}>Anlegen</button></div>
            </div>
            <div style={{flex:1}}>
              <table style={{width:'100%'}}>
                <thead><tr><th>Name</th><th>Dauer</th><th>Preis</th></tr></thead>
                <tbody>{services.map(s=> <tr key={s.id}><td>{s.name}</td><td>{s.duration_min} min</td><td>{s.price_cents} ct</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab==='staff' && (
        <div>
          <h2>Mitarbeiter</h2>
          <div style={{display:'flex',gap:12}}>
            <div style={{flex:1}}>
              <Field label="Name"><input value={staffName} onChange={e=>setStaffName(e.target.value)} /></Field>
              <div><button onClick={createStaff}>Anlegen</button></div>
            </div>
            <div style={{flex:1}}>
              <table style={{width:'100%'}}>
                <thead><tr><th>Name</th></tr></thead>
                <tbody>{staff.map(s=> <tr key={s.id}><td>{s.name}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab==='openings' && (
        <div>
          <h2>Öffnungszeiten</h2>
          <div style={{display:'flex',gap:12}}>
            <div style={{flex:1}}>
              <Field label="Wochentag (0-6)"><input type="number" min={0} max={6} value={opWd} onChange={e=>setOpWd(Number(e.target.value))} /></Field>
              <Field label="Start"><input value={opStart} onChange={e=>setOpStart(e.target.value)} /></Field>
              <Field label="Ende"><input value={opEnd} onChange={e=>setOpEnd(e.target.value)} /></Field>
              <div><button onClick={createOpening}>Anlegen</button></div>
            </div>
            <div style={{flex:1}}>
              <table style={{width:'100%'}}>
                <thead><tr><th>Wochentag</th><th>Start</th><th>Ende</th></tr></thead>
                <tbody>{openings.map(o=> <tr key={o.id}><td>{o.weekday}</td><td>{o.start_time}</td><td>{o.end_time}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
