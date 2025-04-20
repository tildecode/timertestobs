// Password protect panel
if(!sessionStorage.getItem('timerAuth')){
  const pwd = prompt('Enter password to edit the timer:');
  if(pwd !== 'qw2er4tyuiop'){
    document.body.innerHTML='<h2 style="color:white;font-family:sans-serif;text-align:center;margin-top:40vh;">Access denied</h2>';
    throw new Error('Unauthorized');
  }
  sessionStorage.setItem('timerAuth','1');
}

function overlayURL(){
  return location.origin + location.pathname.replace(/\/panel\.html$/, '/index.html');
}
const linkSpan=document.getElementById('obs-link');
linkSpan.textContent=overlayURL();
linkSpan.onclick=()=>navigator.clipboard.writeText(overlayURL()).then(()=>alert('Overlay URL copied'));

function toEpoch(d,t){
  const [y,m,day]=d.split('-').map(Number);
  const [hh,mm]=t.split(':').map(Number);
  return Date.UTC(y,m-1,day,hh,mm,0);
}
document.getElementById('apply').addEventListener('click',()=>{
  const d=document.getElementById('date').value;
  const t=document.getElementById('time').value;
  if(!d||!t||!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(t)){
    alert('Enter valid date and 24‑hour time (HH:MM)');
    return;
  }
  localStorage.setItem('obsTargetEpoch', String(toEpoch(d,t)));
  alert('Start time saved!');
});

const stored=localStorage.getItem('obsTargetEpoch');
if(stored){
  const dt=new Date(Number(stored));
  document.getElementById('date').value=dt.toISOString().slice(0,10);
  document.getElementById('time').value=dt.toISOString().slice(11,16);
}