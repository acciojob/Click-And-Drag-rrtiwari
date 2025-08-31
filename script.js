const container = document.querySelector('.items');
let isDown = false;
let startPageX = 0;
let startScrollLeft = 0;
function getPageX(e){ if (typeof e.pageX === 'number') return e.pageX; if (e.touches && e.touches[0]) return e.touches[0].pageX; return (e.clientX || 0) + (window.scrollX || 0); }
function onMove(e){
  if (!isDown) return;
  e.preventDefault();
  const pageX = getPageX(e);
  const dx = pageX - startPageX;
  container.scrollLeft = startScrollLeft - dx;
}
function onUp(){
  isDown = false;
  container.classList.remove('active');
  window.removeEventListener('mousemove', onMove, {passive:false});
  window.removeEventListener('touchmove', onMove, {passive:false});
  window.removeEventListener('mouseup', onUp);
  window.removeEventListener('touchend', onUp);
}
container.addEventListener('mousedown', (e) => {
  isDown = true;
  container.classList.add('active');
  startPageX = getPageX(e);
  startScrollLeft = container.scrollLeft;
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
