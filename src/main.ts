import * as THREE from "three";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0";
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x3b8f3b })
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0xff4444 })
);

cube.position.y = 0.5;
scene.add(cube);

// Resize support
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();