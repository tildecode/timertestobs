const timers=[...document.querySelectorAll('.timer')];
const countdownEls=[...document.querySelectorAll('.countdown')];
let idx=0;const SWITCH_MS=120e3;
function target(){const t=localStorage.getItem('obsTargetTime');return t?new Date(t):null;}
function fmt(ms){if(ms<=0)return' T-00:00:00';const s=Math.floor(ms/1e3);const h=String(Math.floor(s/3600)).padStart(2,'0');const m=String(Math.floor(s%3600/60)).padStart(2,'0');const sec=String(s%60).padStart(2,'0');return`T-${h}:${m}:${sec}`;}
function tick(){const tg=target(),now=new Date();const diff=tg?tg-now:0;const txt=fmt(diff);countdownEls.forEach(e=>e.textContent=txt);if(diff>0)requestAnimationFrame(tick);}
function rotate(){timers[idx].classList.remove('active');idx=(idx+1)%timers.length;timers[idx].classList.add('active');}
setInterval(rotate,SWITCH_MS);tick();
window.addEventListener('storage',e=>{if(e.key==='obsTargetTime')tick();});