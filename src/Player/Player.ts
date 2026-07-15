import * as THREE from "three";

export class Player {
  public camera: THREE.PerspectiveCamera;

  private keys: Record<string, boolean> = {};

  private yaw = 0;
  private pitch = 0;

  private walkSpeed = 5;
  private sprintSpeed = 8;
  private sensitivity = 0.002;

  private velocityY = 0;
  private readonly gravity = 20;
  private readonly jumpForce = 8;
  private grounded = true;

  private readonly eyeHeight = 2;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;

    this.camera.position.set(0, this.eyeHeight, 8);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    document.body.addEventListener("click", () => {
      document.body.requestPointerLock();
    });

    document.addEventListener("mousemove", this.onMouseMove);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  private onMouseMove = (e: MouseEvent) => {
    if (document.pointerLockElement !== document.body) return;

    this.yaw -= e.movementX * this.sensitivity;
    this.pitch -= e.movementY * this.sensitivity;

    const limit = Math.PI / 2 - 0.01;
    this.pitch = Math.max(-limit, Math.min(limit, this.pitch));

    this.camera.rotation.order = "YXZ";
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;
  };

  public update(delta: number) {
    // Jump
    if (this.keys["Space"] && this.grounded) {
      this.velocityY = this.jumpForce;
      this.grounded = false;
    }

    // Gravity
    this.velocityY -= this.gravity * delta;
    this.camera.position.y += this.velocityY * delta;

    // Ground collision
    if (this.camera.position.y <= this.eyeHeight) {
      this.camera.position.y = this.eyeHeight;
      this.velocityY = 0;
      this.grounded = true;
    }

    // Horizontal movement
    const direction = new THREE.Vector3();

    if (this.keys["KeyW"]) direction.z -= 1;
    if (this.keys["KeyS"]) direction.z += 1;
    if (this.keys["KeyA"]) direction.x -= 1;
    if (this.keys["KeyD"]) direction.x += 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();

      direction.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        this.yaw
      );

      const speed = this.keys["ShiftLeft"]
        ? this.sprintSpeed
        : this.walkSpeed;

      this.camera.position.addScaledVector(direction, speed * delta);
    }
  }
}