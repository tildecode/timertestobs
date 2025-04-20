function overlayURL () {
  const base = location.origin + location.pathname.replace(/panel\.html$/, '');
  return (base.endsWith('/') ? base : base + '/') + 'index.html';
}
const link = document.getElementById('obs-link');
link.textContent = overlayURL();
link.addEventListener('click', ()=>navigator.clipboard.writeText(overlayURL()).then(()=>alert('URL copied')));
function toEpoch(d,t){const [y,m,day]=d.split('-').map(Number);const [hh,mm]=t.split(':').map(Number);return Date.UTC(y,m-1,day,hh,mm,0);}
document.getElementById('apply').addEventListener('click',()=>{
  const d=document.getElementById('date').value;
  const t=document.getElementById('time').value;
  if(!d||!t){alert('Fill date/time');return;}
  localStorage.setItem('obsTargetEpoch',String(toEpoch(d,t)));
  alert('Saved!')
});
const prev=localStorage.getItem('obsTargetEpoch');
if(prev){
  const dt=new Date(Number(prev));
  document.getElementById('date').value=dt.toISOString().slice(0,10);
  document.getElementById('time').value=dt.toISOString().slice(11,16);
}