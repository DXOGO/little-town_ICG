// CAR 
function createWheels(x,z) {
    const geometry = new THREE.CylinderGeometry(8, 8, 8, 8);
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
    const wheels = new THREE.Group();
    const body = new THREE.Group();
    const windows = new THREE.Group();
    
    const backWheel1 = createWheels(-20, 12);  
    const backWheel2 = createWheels(-20, -12);
    const frontWheel1 = createWheels(20, -12);
    const frontWheel2 = createWheels(20, 12);

    wheels.add(backWheel1);
    wheels.add(backWheel2);
    wheels.add(frontWheel1);
    wheels.add(frontWheel2);
    
    const main = new THREE.Mesh( new THREE.BoxBufferGeometry(60, 15, 30), new THREE.MeshStandardMaterial({ color: 'red' }) );
    main.position.y = 12;
    body.add(main);
      
    const cabin = new THREE.Mesh( new THREE.BoxBufferGeometry(33, 11, 24), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    cabin.position.x = -6;
    cabin.position.y = 24.5;
    body.add(cabin);
      
    const windowback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 18), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
    windowback.position.x = -17.8;
    windowback.position.y = 23;
    windows.add(windowback);

        
    const sidewindowsback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 24.3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
    sidewindowsback.position.x = -15;
    sidewindowsback.position.y = 23;
    windows.add(sidewindowsback);
          
    const sidewindowsfront = new THREE.Mesh( new THREE.BoxBufferGeometry(14, 8, 24.3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
    sidewindowsfront.position.x = 0;
    sidewindowsfront.position.y = 23;
    windows.add(sidewindowsfront);
            
    const sidewindowsfront2 = new THREE.Mesh( new THREE.CylinderGeometry(5.5, 5.5, 24.3, 3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
    sidewindowsfront2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    sidewindowsfront2.position.x = 7;
    sidewindowsfront2.position.y = 21.5;
    windows.add(sidewindowsfront2);
      
    const frontwindow = new THREE.Mesh( new THREE.CylinderGeometry(7, 7, 24, 3), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    frontwindow.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    frontwindow.position.x = 10.6;
    frontwindow.position.y = 23;
    windows.add(windowback);
        
    const frontwindow2 = new THREE.Mesh( new THREE.CylinderGeometry(6.5, 6.5, 20, 3), new THREE.MeshStandardMaterial({ color: 0x333333 }) );
    frontwindow2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    frontwindow2.position.x = 12;
    frontwindow2.position.y = 21.5;
    windows.add(frontwindow2);
    
    // lights
    const light1 = createLight(-9.5);
    const light2 = createLight(9.5);
  
    car.add(wheels, body, windows);
    car.add(light1, light2);  

    // Name
    wheels.name = "wheels";

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
  
///////////////////////////////////////////////////////////////////////////////////////////////////
// TREE
function createTree() {
    //create a group and add the two shapes
    var tree = new THREE.Group();

    var logGeometry = new THREE.CylinderGeometry( 20, 20, 60, 50 );
    var logMaterial = new THREE.MeshStandardMaterial( {color: 0x964B00,} );
    var log = new THREE.Mesh( logGeometry, logMaterial );

    log.position.x = 50;	
    log.position.y = 30;
    log.position.z = 50;

                
    // RECEIVE AND CAST SHADOW 
    log.receiveShadow = true;
    log.castShadow = true;

    tree.add(log);

    var leafGeometry = new THREE.ConeGeometry( 28, 70, 50 );
    var leafMaterial = new THREE.MeshStandardMaterial( {color: 0x008000, wireframe: false} );
    var leaf = new THREE.Mesh( leafGeometry, leafMaterial );

    leaf.position.x = 50;	
    leaf.position.y = 90;
    leaf.position.z = 50;

    // RECEIVE AND CAST SHADOW 
    leaf.receiveShadow = true;
    leaf.castShadow = true;

    tree.add( leaf );

    return tree
}  

///////////////////////////////////////////////////////////////////////////////////////////////////
// ROAD
function createRoad(h, w) {

    const roadGeometry1 = new THREE.PlaneGeometry(h, w);
    const roadMaterial1 = new THREE.MeshStandardMaterial({ color: 0x0F0F0F, side: THREE.DoubleSide });
    const road = new THREE.Mesh(roadGeometry1, roadMaterial1);
    // Change orientation of the road using rotation
    road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    road.position.y=0.3;
    // Set shadow property
    road.receiveShadow = true;

    return road;
}