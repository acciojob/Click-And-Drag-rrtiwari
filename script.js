const container = document.querySelector('.items');
let isDown = false;
let startPageX = 0;
let startScrollLeft = 0;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  container.classList.add('active');
  startPageX = e.pageX;
  startScrollLeft = container.scrollLeft;
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const dx = e.pageX - startPageX;
  container.scrollLeft = startScrollLeft - dx;
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('active');
});
