import * as THREE from "three";

export class World {
  constructor(scene: THREE.Scene) {
    // =====================
    // LIGHTING
    // =====================

    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(30, 40, 20);
    scene.add(sun);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // =====================
    // GROUND
    // =====================

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(250, 250),
      new THREE.MeshStandardMaterial({
        color: 0x4b8b3b,
      })
    );

    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    scene.add(ground);

    // =====================
    // ROAD
    // =====================

    const road = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.05, 250),
      new THREE.MeshStandardMaterial({
        color: 0x333333,
      })
    );

    road.position.y = 0.03;
    scene.add(road);

    // =====================
    // SIDEWALKS
    // =====================

    const sidewalkMaterial = new THREE.MeshStandardMaterial({
      color: 0x999999,
    });

    const leftSidewalk = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.08, 250),
      sidewalkMaterial
    );

    leftSidewalk.position.set(-5, 0.04, 0);
    scene.add(leftSidewalk);

    const rightSidewalk = leftSidewalk.clone();
    rightSidewalk.position.x = 5;
    scene.add(rightSidewalk);

    // =====================
    // HOUSE
    // =====================

    this.createHouse(scene, -18, -25);
  }

  private createHouse(
    scene: THREE.Scene,
    x: number,
    z: number
  ) {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8c4a5,
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x777777,
    });

    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b2f2f,
    });

    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x5b3212,
    });

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x7ec8ff,
    });

    // FLOOR

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.2, 8),
      floorMaterial
    );

    floor.position.set(x, 0.1, z);
    scene.add(floor);

    // LEFT WALL

    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3, 8),
      wallMaterial
    );

    leftWall.position.set(x - 4, 1.5, z);
    scene.add(leftWall);

    // RIGHT WALL

    const rightWall = leftWall.clone();
    rightWall.position.x = x + 4;
    scene.add(rightWall);

    // BACK WALL

    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(8, 3, 0.25),
      wallMaterial
    );

    backWall.position.set(x, 1.5, z - 4);
    scene.add(backWall);

    // FRONT LEFT WALL

    const frontLeft = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 3, 0.25),
      wallMaterial
    );

    frontLeft.position.set(x - 2.75, 1.5, z + 4);
    scene.add(frontLeft);

    // FRONT RIGHT WALL

    const frontRight = frontLeft.clone();
    frontRight.position.x = x + 2.75;
    scene.add(frontRight);

    // TOP OF DOOR

    const topDoor = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1, 0.25),
      wallMaterial
    );

    topDoor.position.set(x, 2.5, z + 4);
    scene.add(topDoor);

    // DOOR

    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 2, 0.12),
      doorMaterial
    );

    door.position.set(x, 1, z + 3.93);
    scene.add(door);

    // WINDOWS

    const leftWindow = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1, 0.1),
      windowMaterial
    );

    leftWindow.position.set(x - 2, 1.7, z + 3.94);
    scene.add(leftWindow);

    const rightWindow = leftWindow.clone();
    rightWindow.position.x = x + 2;
    scene.add(rightWindow);

    // ROOF

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(6.2, 2.2, 4),
      roofMaterial
    );

    roof.rotation.y = Math.PI / 4;
    roof.position.set(x, 4, z);

    scene.add(roof);
  }
}