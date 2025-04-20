
// --- simple password gate ---
if(!sessionStorage.getItem('timerAuth')){
  const pwd = prompt('Enter password to edit the timer:');
  if(pwd !== 'qw2er4tyuiop'){
    alert('Incorrect password'); 
    document.body.innerHTML = '<h2 style="color:white;font-family:sans-serif;text-align:center;margin-top:40vh;">Access denied</h2>';
    throw new Error('Unauthorized');
  }
  sessionStorage.setItem('timerAuth','1');
}
// --- end gate ---

function toISO(d,t){
  const [y,m,day] = d.split('-').map(Number);
  const [hh,mm] = t.split(':').map(Number);
  return new Date(Date.UTC(y,m-1,day,hh,mm)).toISOString();
}
document.getElementById('apply').addEventListener('click',()=>{
  const d = document.getElementById('date').value;
  const t = document.getElementById('time').value;
  if(!d || !t){
    alert('Fill both date and time');
    return;
  }
  localStorage.setItem('obsTargetTime', toISO(d,t));
  alert('Start time set!');
});
const prev = localStorage.getItem('obsTargetTime');
if(prev){
  const d = new Date(prev);
  document.getElementById('date').value = d.toISOString().slice(0,10);
  document.getElementById('time').value = d.toISOString().slice(11,16);
}
