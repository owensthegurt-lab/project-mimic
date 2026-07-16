import * as THREE from "three";
import { Player } from "./player/Player";
import { World } from "./world/World";

export class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;

  private player: Player;
  private world: World;

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

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    document.body.style.margin = "0";
    document.body.appendChild(this.renderer.domElement);

    // Clock
    this.clock = new THREE.Clock();

    // World
    this.world = new World(this.scene);

    // Player
    this.player = new Player(this.camera);

    window.addEventListener("resize", this.onResize);

    this.animate();
  }

  private onResize = () => {
    this.camera.aspect =
      window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  };

  private animate = () => {
    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    this.player.update(delta);

    this.world.update(delta);

    this.renderer.render(
      this.scene,
      this.camera
    );
  };
}