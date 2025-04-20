const timers=[...document.querySelectorAll('.timer')];
const cds=[...document.querySelectorAll('.countdown')];
const SWITCH=120000;
let idx=0;
function tgt(){return Number(localStorage.getItem('obsTargetEpoch')||0);}
function fmt(ms){if(ms<=0)return 'T-00:00:00';const s=Math.floor(ms/1000);const h=String(Math.floor(s/3600)).padStart(2,'0');const m=String(Math.floor(s%3600/60)).padStart(2,'0');const sec=String(s%60).padStart(2,'0');return`T-${h}:${m}:${sec}`;}
function upd(){const d=tgt()-Date.now();const txt=fmt(d);cds.forEach(el=>el.textContent=txt);}
upd();setInterval(upd,1000);
setInterval(()=>{timers[idx].classList.remove('active');idx=(idx+1)%timers.length;timers[idx].classList.add('active');},SWITCH);
window.addEventListener('storage',e=>{if(e.key==='obsTargetEpoch')upd();});