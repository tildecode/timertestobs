const timers = [...document.querySelectorAll('.timer')];
const countEls = [...document.querySelectorAll('.countdown')];
let index = 0;
const SWITCH_MS = 120000;

// switch animation
setInterval(() => {
  timers[index].classList.remove('active');
  index = (index + 1) % timers.length;
  timers[index].classList.add('active');
}, SWITCH_MS);

// countdown
function getTarget(){ return localStorage.getItem('obsTargetTime'); }

function format(diff){
  if(diff <= 0) return 'T-00:00:00';
  const sec = Math.floor(diff/1000);
  const h = String(Math.floor(sec/3600)).padStart(2,'0');
  const m = String(Math.floor((sec%3600)/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `T-${h}:${m}:${s}`;
}

function update(){
  const tg = getTarget();
  const now = Date.now();
  const diff = tg ? (Date.parse(tg) - now) : 0;
  const txt = format(diff);
  countEls.forEach(el => el.textContent = txt);
}
update();
setInterval(update, 1000);

window.addEventListener('storage', e=>{
  if(e.key === 'obsTargetTime') update();
});