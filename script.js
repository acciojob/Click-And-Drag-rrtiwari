const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.style.position = 'absolute'; 

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.zIndex = 1000;
    e.preventDefault();
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();
  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;
  left = Math.max(0, Math.min(left, containerRect.width - cubeRect.width));
  top = Math.max(0, Math.min(top, containerRect.height - cubeRect.height));

  selectedCube.style.left = left + 'px';
  selectedCube.style.top = top + 'px';
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
    selectedCube = null;
  }
});

