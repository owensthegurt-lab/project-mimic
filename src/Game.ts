import * as THREE from "three";
import { Player } from "./player/Player";

export class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  private player: Player;

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
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.style.margin = "0";
    document.body.appendChild(this.renderer.domElement);

    // Clock
    this.clock = new THREE.Clock();

    // Player
    this.player = new Player(this.camera);

    // Lighting
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(30, 40, 20);
    this.scene.add(sun);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({
        color: 0x4b8b3b,
      })
    );

    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Road
    const road = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.05, 200),
      new THREE.MeshStandardMaterial({
        color: 0x333333,
      })
    );

    road.position.y = 0.03;
    this.scene.add(road);

    // Sidewalks
    const sidewalkMaterial = new THREE.MeshStandardMaterial({
      color: 0x999999,
    });

    const leftSidewalk = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.08, 200),
      sidewalkMaterial
    );

    leftSidewalk.position.set(-5, 0.04, 0);
    this.scene.add(leftSidewalk);

    const rightSidewalk = leftSidewalk.clone();
    rightSidewalk.position.x = 5;
    this.scene.add(rightSidewalk);

    // House
    const house = new THREE.Mesh(
      new THREE.BoxGeometry(6, 4, 6),
      new THREE.MeshStandardMaterial({
        color: 0xc29b68,
      })
    );

    house.position.set(-15, 2, -20);
    this.scene.add(house);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(5, 2, 4),
      new THREE.MeshStandardMaterial({
        color: 0x8b2f2f,
      })
    );

    roof.rotation.y = Math.PI / 4;
    roof.position.set(-15, 5, -20);
    this.scene.add(roof);

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

    const delta = this.clock.getDelta();

    this.player.update(delta);

    this.renderer.render(this.scene, this.camera);
  };
}