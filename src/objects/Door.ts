import * as THREE from "three";

export class Door {
  public mesh: THREE.Mesh;

  private isOpen = false;
  private targetRotation = 0;

  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 2, 0.12),
      new THREE.MeshStandardMaterial({
        color: 0x5b3212,
      })
    );

    this.mesh.position.set(0, 1, 3.93);
  }

  public toggle() {
    this.isOpen = !this.isOpen;

    this.targetRotation = this.isOpen
      ? -Math.PI / 2
      : 0;
  }

  public update(delta: number) {
    this.mesh.rotation.y +=
      (this.targetRotation - this.mesh.rotation.y) *
      8 *
      delta;
  }
}