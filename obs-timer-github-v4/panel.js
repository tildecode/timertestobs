function overlayURL(){
  const base = location.origin + location.pathname.replace(/panel\.html$/, '');
  return base.endsWith('/') ? base + 'index.html' : base + '/index.html';
}
document.getElementById('obs-link').textContent = overlayURL();
document.getElementById('obs-link').addEventListener('click', ()=> {
  navigator.clipboard.writeText(overlayURL()).then(()=>alert('Overlay URL copied'));
});

function toISO(dateStr,timeStr){
  const [y,m,d] = dateStr.split('-').map(Number);
  const [hh,mm] = timeStr.split(':').map(Number);
  return new Date(Date.UTC(y, m-1, d, hh, mm)).toISOString();
}
document.getElementById('apply').addEventListener('click', () => {
  const d = document.getElementById('date').value;
  const t = document.getElementById('time').value;
  if(!d || !t){ alert('Fill both date and time (UTC)'); return; }
  localStorage.setItem('obsTargetTime', toISO(d,t));
  alert('Start time saved!');
});
const prev = localStorage.getItem('obsTargetTime');
if(prev){
  const dt = new Date(prev);
  document.getElementById('date').value = dt.toISOString().slice(0,10);
  document.getElementById('time').value = dt.toISOString().slice(11,16);
}