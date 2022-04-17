function createWheels(x,z) {
  const geometry = new THREE.CylinderGeometry(8, 8, 8, 20);
  const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  wheel.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  wheel.position.y= 6;
  wheel.position.x = x;
  wheel.position.z = z;
  return wheel;
}

function createCar() {
  const car = new THREE.Group();
  
  const backWheel1 = createWheels(-20, 12);  
  const backWheel2 = createWheels(-20, -12);
  const frontWheel1 = createWheels(20, -12);
  const frontWheel2 = createWheels(20, 12);
  
  const main = new THREE.Mesh( new THREE.BoxBufferGeometry(60, 15, 30), new THREE.MeshStandardMaterial({ color: 'red' }) );
  main.position.y = 12;
    
  const cabin = new THREE.Mesh( new THREE.BoxBufferGeometry(33, 11, 24), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
  cabin.position.x = -6;
  cabin.position.y = 24.5;
    
  const windowback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 18), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
  windowback.position.x = -17.8;
  windowback.position.y = 23;
      
  const sidewindowsback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 24.3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
  sidewindowsback.position.x = -15;
  sidewindowsback.position.y = 23;
        
  const sidewindowsfront = new THREE.Mesh( new THREE.BoxBufferGeometry(14, 8, 24.3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
  sidewindowsfront.position.x = 0;
  sidewindowsfront.position.y = 23;
          
  const sidewindowsfront2 = new THREE.Mesh( new THREE.CylinderGeometry(5.5, 5.5, 24.3, 3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
  sidewindowsfront2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
  sidewindowsfront2.position.x = 7;
  sidewindowsfront2.position.y = 21.5;
    
  const frontwindow = new THREE.Mesh( new THREE.CylinderGeometry(7, 7, 24, 3), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
  frontwindow.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
  frontwindow.position.x = 10.6;
  frontwindow.position.y = 23;
      
  const frontwindow2 = new THREE.Mesh( new THREE.CylinderGeometry(6.5, 6.5, 20, 3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
  frontwindow2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
  frontwindow2.position.x = 12;
  frontwindow2.position.y = 21.5;
  
  // lights
  const light1 = createLight(-9.5);
  const light2 = createLight(9.5);

  car.add(frontwindow2);
  car.add(frontwindow);
  car.add(sidewindowsfront2);
  car.add(sidewindowsback);
  car.add(sidewindowsfront);
  car.add(windowback);
  car.add(frontWheel1);
  car.add(frontWheel2);
  car.add(backWheel1);
  car.add(backWheel2);
  car.add(main);
  car.add(cabin);
  car.add(light1);  
  car.add(light2);

  // Set shadow property
  main.castShadow = true;
  main.receiveShadow = true;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  light1.castShadow = true;
  light2.castShadow = true;
  
  car.translateY(2);
  return car;
}

function createLight(z) {

  const bulblight = new THREE.Group();

  let bulb = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,4), new THREE.MeshStandardMaterial({ color: 0xffffff}) );
  bulb.position.set(30, 15, z);
  bulblight.add(bulb);

  let light = new THREE.SpotLight(0xffffff, 2, 0, THREE.Math.degToRad(50), 0.1);
  light.position.set(20, 15, z);
  bulblight.add(light);

  
  let lightTarget = new THREE.Object3D();
  lightTarget.position.set(20+0.01, 15, z);
  light.target = lightTarget;
  bulblight.add(lightTarget);
    
  return bulblight;
}

