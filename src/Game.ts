import * as THREE from "three";

export class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;

  constructor() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.style.margin = "0";
    document.body.appendChild(this.renderer.domElement);

    // Lighting
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(5, 10, 5);

    this.scene.add(sun);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0x3b8f3b })
    );

    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // Cube
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshStandardMaterial({ color: 0xff4444 })
    );

    this.cube.position.y = 0.5;
    this.scene.add(this.cube);

    window.addEventListener("resize", this.onResize);

    this.animate();
  }

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };
}