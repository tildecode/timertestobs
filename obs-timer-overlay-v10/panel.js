// --- password gate ---
if(!sessionStorage.getItem('timerAuth')){
  const pwd = prompt('Enter password to edit the timer:');
  if(pwd !== 'qw2er4tyuiop'){
    document.body.innerHTML = '<h2 style="color:white;font-family:sans-serif;text-align:center;margin-top:40vh;">Access denied</h2>';
    throw new Error('Unauthorized');
  }
  sessionStorage.setItem('timerAuth','1');
}
// --- end gate ---


function overlayURL(){
  return location.origin + location.pathname.replace(/\/panel\.html$/, '/index.html');
}

const linkSpan = document.getElementById('obs-link');
linkSpan.textContent = overlayURL();
linkSpan.addEventListener('click', ()=>navigator.clipboard.writeText(overlayURL()).then(()=>alert('URL copied')));

function toEpoch(dateStr,timeStr){
  const [y,m,d] = dateStr.split('-').map(Number);
  const [hh,mm] = timeStr.split(':').map(Number);
  return Date.UTC(y, m-1, d, hh, mm, 0);
}

document.getElementById('apply').addEventListener('click', ()=>{
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  if(!date || !time || !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(time)){
    alert('Enter date and 24‑hour time as HH:MM');
    return;
  }
  const epoch = toEpoch(date, time);
  localStorage.setItem('obsTargetEpoch', String(epoch));
  alert('Start time saved!');
});

const stored = localStorage.getItem('obsTargetEpoch');
if(stored){
  const dt = new Date(Number(stored));
  document.getElementById('date').value = dt.toISOString().slice(0,10);
  document.getElementById('time').value = dt.toISOString().slice(11,16);
}