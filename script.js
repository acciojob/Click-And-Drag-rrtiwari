const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');
let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube, i) => {
  const cols = 5;
  const size = 100;
  const gap = 10;
  const row = Math.floor(i / cols);
  const col = i % cols;
  cube.style.left = col * (size + gap) + 'px';
  cube.style.top = row * (size + gap) + 'px';

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';
    moveCube(e.pageX, e.pageY, containerRect);
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;
  const containerRect = container.getBoundingClientRect();
  moveCube(e.pageX, e.pageY, containerRect);
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});

function moveCube(pageX, pageY, containerRect) {
  const cubeRect = selectedCube.getBoundingClientRect();
  let left = pageX - containerRect.left - offsetX;
  let top = pageY - containerRect.top - offsetY;
  left = Math.max(0, Math.min(left, containerRect.width - cubeRect.width));
  top = Math.max(0, Math.min(top, containerRect.height - cubeRect.height));
  selectedCube.style.left = left + 'px';
  selectedCube.style.top = top + 'px';
}
