const express = require('express');
const fs = require('fs');
const path = require('path');
console.log('node', process.version);
const clientDist = path.resolve(__dirname, '..', 'frontend', 'dist');
let app;
try{
  app = express();
  console.log('express ok');
}catch(e){ console.error('express create error', e); process.exit(1)}

function tryCall(name, fn){
  try{
    fn();
    console.log('OK', name);
  }catch(e){
    console.error('ERROR at', name, e && e.stack || e);
  }
}

tryCall('app.use(cors())', ()=>{
  const cors = require('cors'); app.use(cors());
});
tryCall('app.use(express.json())', ()=>{ app.use(express.json()); });
tryCall('app.get(/api/health)', ()=>{ app.get('/api/health', ()=>{}); });
tryCall('express.static', ()=>{
  if (fs.existsSync(clientDist)){
    app.use(express.static(clientDist));
  }else{
    console.log('clientDist not exists', clientDist);
  }
});
tryCall("app.get('/*')", ()=>{ app.get('/*', ()=>{}); });
tryCall("app.get('/api/:tenant/services')", ()=>{ app.get('/api/:tenant/services', ()=>{}); });
tryCall("app.get('/api/:tenant/staff')", ()=>{ app.get('/api/:tenant/staff', ()=>{}); });
tryCall("app.get('/api/:tenant/availability')", ()=>{ app.get('/api/:tenant/availability', ()=>{}); });
tryCall("app.post('/api/:tenant/book')", ()=>{ app.post('/api/:tenant/book', ()=>{}); });
console.log('done');
