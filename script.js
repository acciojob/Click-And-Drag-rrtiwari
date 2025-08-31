const container = document.querySelector('.items');
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX;
  container.scrollLeft = scrollLeft - walk;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'pointer';
});


