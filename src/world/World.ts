import * as THREE from "three";
import { House } from "../objects/House";

export class World {
  constructor(scene: THREE.Scene) {
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(30, 40, 20);
    scene.add(sun);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(250, 250),
      new THREE.MeshStandardMaterial({
        color: 0x4b8b3b,
      })
    );

    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const road = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.05, 250),
      new THREE.MeshStandardMaterial({
        color: 0x333333,
      })
    );

    road.position.y = 0.03;
    scene.add(road);

    const sidewalkMaterial = new THREE.MeshStandardMaterial({
      color: 0x999999,
    });

    const left = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.08, 250),
      sidewalkMaterial
    );

    left.position.set(-5, 0.04, 0);
    scene.add(left);

    const right = left.clone();
    right.position.x = 5;
    scene.add(right);

    scene.add(new House(-18, -25).group);
    scene.add(new House(18, -40).group);
    scene.add(new House(-18, 20).group);
    scene.add(new House(18, 35).group);
  }
}