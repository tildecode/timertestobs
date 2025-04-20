const timers=[...document.querySelectorAll('.timer')];
const cds=[...document.querySelectorAll('.countdown')];
let idx=0;
const SWITCH=120000;
function target(){return Number(localStorage.getItem('obsTargetEpoch')||0);}
function format(ms){if(ms<=0)return' T-00:00:00'.trim();const s=Math.floor(ms/1000);const h=String(Math.floor(s/3600)).padStart(2,'0');const m=String(Math.floor(s%3600/60)).padStart(2,'0');const sec=String(s%60).padStart(2,'0');return `T-${h}:${m}:${sec}`;}
function update(){const diff=target()-Date.now();const txt=format(diff);cds.forEach(el=>el.textContent=txt);}
update();setInterval(update,1000);
setInterval(()=>{timers[idx].classList.remove('active');idx=(idx+1)%timers.length;timers[idx].classList.add('active');},SWITCH);
window.addEventListener('storage',e=>{if(e.key==='obsTargetEpoch')update();});