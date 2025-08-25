import React, { useEffect, useState } from 'react';
import api from '../lib/api';

type Service = { id:number; name:string; duration_min:number; price_cents:number };
type Staff = { id:number; name:string };

export default function Booking(){
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [serviceId, setServiceId] = useState<number|''>('');
  const [staffId, setStaffId] = useState<number|''>('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<any[]>([]);
  const [showSlotPicker, setShowSlotPicker] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(()=>{ api.getServices().then(setServices).catch(()=>{}); api.getStaff().then(setStaff).catch(()=>{}); },[]);

  async function loadSlots(){
    if (!serviceId || !date) return;
    const res = await api.getAvailability({ date, serviceId: Number(serviceId), staffId: staffId?Number(staffId):undefined });
    setSlots(res.slots||[]);
    setShowSlotPicker(true);
  }

  async function handleBook(slot:any){
    if (!serviceId || !date || !name || !email) { alert('Bitte Service, Datum, Name und E-Mail ausfüllen.'); return; }
    const payload = { serviceId: Number(serviceId), staffId: slot.staffId, date, startTime: slot.start, customer:{ name, email, phone } };
    try{
      const res = await api.book(payload);
      if (res.ok){
        alert('Termin gebucht! Bestätigung per E-Mail gesendet.');
        setName(''); setEmail(''); setPhone(''); setShowSlotPicker(false);
      } else {
        alert('Buchung fehlgeschlagen');
      }
    }catch(e:any){ alert('Fehler: '+e.message); }
  }

  return (
    <div style={{padding:20}}>
      <h1>Termin buchen</h1>

      <div style={{marginBottom:12}}>
        <label>Dienstleistung *</label><br/>
        <select value={serviceId} onChange={e=>setServiceId(e.target.value?Number(e.target.value):'')}>
          <option value="">-- wählen --</option>
          {services.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div style={{marginBottom:12}}>
        <label>Mitarbeiter (optional)</label><br/>
        <select value={staffId} onChange={e=>setStaffId(e.target.value?Number(e.target.value):'')}>
          <option value="">Jeder</option>
          {staff.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div style={{marginBottom:12}}>
        <label>Datum *</label><br/>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>

      <div style={{marginBottom:12}}>
        <button onClick={loadSlots}>Freie Zeiten anzeigen</button>
      </div>

      {showSlotPicker && (
        <div style={{marginBottom:12}}>
          <h3>Freie Zeiten</h3>
          {slots.length===0 && <div>Keine freien Zeiten</div>}
          <ul>
            {slots.map((slot:any,idx:number)=> (
              <li key={idx} style={{marginBottom:6}}>
                <button onClick={()=>handleBook(slot)}>{slot.start}–{slot.end} • {slot.staffName}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3>Ihre Daten</h3>
        <div><label>Name *</label><br/><input value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><label>E-Mail *</label><br/><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Telefon</label><br/><input value={phone} onChange={e=>setPhone(e.target.value)} /></div>
      </div>
    </div>
  );
}
