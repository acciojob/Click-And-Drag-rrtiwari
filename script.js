const container = document.getElementById('items');
let isDown = false;
let startPageX = 0;
let startScrollLeft = 0;

function getPageX(e){
  if (typeof e.pageX === 'number') return e.pageX;
  if (e.touches && e.touches[0]) return e.touches[0].pageX;
  return (e.clientX || 0) + (window.scrollX || 0);
}

function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

function onMove(e){
  if (!isDown) return;
  if (e.cancelable) e.preventDefault();
  const pageX = getPageX(e);
  const dx = pageX - startPageX;
  const maxScroll = container.scrollWidth - container.clientWidth;
  const newScroll = startScrollLeft - dx;
  container.scrollLeft = clamp(newScroll, 0, maxScroll);
}

function onUp(){
  isDown = false;
  container.classList.remove('active');
  container.removeEventListener('mousemove', onMove);
  window.removeEventListener('mousemove', onMove);
  window.removeEventListener('touchmove', onMove);
  window.removeEventListener('mouseup', onUp);
  window.removeEventListener('touchend', onUp);
}

container.addEventListener('mousedown', (e) => {
  isDown = true;
  if (e.cancelable) e.preventDefault();
  container.classList.add('active');
  startPageX = getPageX(e);
  startScrollLeft = container.scrollLeft;
  container.addEventListener('mousemove', onMove, {passive:false});
  window.addEventListener('mousemove', onMove, {passive:false});
  window.addEventListener('mouseup', onUp);
});

container.addEventListener('touchstart', (e) => {
  isDown = true;
  container.classList.add('active');
  startPageX = getPageX(e);
  startScrollLeft = container.scrollLeft;
  window.addEventListener('touchmove', onMove, {passive:false});
  window.addEventListener('touchend', onUp);
});

container.addEventListener('mouseleave', onUp);

