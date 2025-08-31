const container = document.querySelector('.items');
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  scrollLeft = container.scrollLeft;
  container.style.cursor = 'grabbing';
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const walk = e.clientX - startX;
  container.scrollLeft = scrollLeft - walk;
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'pointer';
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
});
