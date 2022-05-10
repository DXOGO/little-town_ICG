// PLANE
function createPlane(l,w){
  // const texture = new THREE.TextureLoader().load( "resources/grass.jpg" );
  
  // texture.wrapS = THREE.RepeatWrapping; 
  // texture.wrapT = THREE.RepeatWrapping;
  
  // texture.repeat.set( 5, 5 ); 
  
  const planeGeometry = new THREE.PlaneGeometry(l, w);
  const planeMaterial = new THREE.MeshStandardMaterial({color: 'green', side : THREE.DoubleSide});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  plane.receiveShadow = true;

  return plane;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// WHEELS
function createWheels(x,z) {
    const geometry = new THREE.CylinderGeometry(8, 8, 8, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    wheel.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    wheel.position.set(x,6,z)
  
    wheel.castShadow = true;
    wheel.receiveShadow = true;
    
    return wheel;
  }
  
  // CAR
  function createCar(posx, posy, posz) {
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
  
    car.add(windowback, frontwindow, frontwindow2, sidewindowsback, sidewindowsfront, sidewindowsfront2,  )
    car.add(backWheel1, backWheel2, frontWheel1, frontWheel2);
    car.add(light1, light2)
    car.add(main, cabin);

    // Set shadow property
    main.castShadow = true;
    main.receiveShadow = true;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    light1.castShadow = true;
    light2.castShadow = true;
    
    car.position.set(posx, posy, posz);
    return car;
  }
  
  function createLight(z) {
  
    const bulblight = new THREE.Group();
  
    let bulb = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,4), new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    bulb.position.set(30, 15, z);
    bulblight.add(bulb);
  
    let light = new THREE.SpotLight(0xffffff, 2.2, 0, THREE.Math.degToRad(30), 0.4);
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
function createTree(posx, posz) {
    //create a group and add the two shapes
    var tree = new THREE.Group();

    var logGeometry = new THREE.CylinderGeometry( 20, 20, 60, 50 );
    var logMaterial = new THREE.MeshStandardMaterial( {color: 0x964B00,} );
    var log = new THREE.Mesh( logGeometry, logMaterial );
    log.position.set(50,30,50)
    
    var leafGeometry = new THREE.ConeGeometry( 28, 70, 50 );
    var leafMaterial = new THREE.MeshStandardMaterial( {color: 0x008000, wireframe: false} );
    var leaf = new THREE.Mesh( leafGeometry, leafMaterial );
    leaf.position.set(50,90,50);
    
    // RECEIVE AND CAST SHADOW 
    log.receiveShadow = true;
    log.castShadow = true;
    leaf.receiveShadow = true;
    leaf.castShadow = true;
    
    tree.add(log);
    tree.add(leaf);

    tree.position.set(posx, 0, posz);

    return tree
}  

///////////////////////////////////////////////////////////////////////////////////////////////////
// ROAD
function createRoad(l, w, posx, posz) {

  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({ color: 0x0F0F0F, side: THREE.DoubleSide });
  road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  // Change orientation of the road using rotation
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 0.5, posz);
  // Set shadow property
  road.receiveShadow = true;
  fullroad.add(road);

  const geometry = new THREE.PlaneGeometry( l/40, w/20 );
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

  if (l>w){
    for (var i=posx+50; i < l+posx; i+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      white_line.position.set(-l/2+i, 1, posz)
      white_line.receiveShadow = true;
      fullroad.add(white_line);
    }
  }

  if (w>l){
    for (var i=posz+50; i < w+posz; i+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      white_line.position.set(posx, 1, -w/2+i)
      white_line.receiveShadow = true;
      fullroad.add(white_line);
    }
  }
 
    return fullroad;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING
function createBuilding(h, w, posx, posz) {

  const building = new THREE.Group();  

  return building
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LIGHT POSTS
function createPost(h, w, posx, posz) {

  const post = new THREE.Group();  

  return post
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// SUN
function createSun(posx, posy, posz){
  const texture = new THREE.TextureLoader().load( "resources/sun.jpg" )
  const geometry = new THREE.SphereGeometry( 50, 32, 32 );
  const material = new THREE.MeshBasicMaterial( { map: texture, color: 0xfbff7a } );
  
  const sun = new THREE.Mesh( geometry, material );
  sun.position.set(posx, posy, posz);
  sun.name = "sun";

  return sun;
}

// MOON
function createMoon(posx, posy, posz){
  const texture = new THREE.TextureLoader().load( "resources/moon.jpg" );
  const geometry = new THREE.SphereGeometry( 20, 32, 32 );
  const material = new THREE.MeshBasicMaterial( { map: texture } );
  const moon = new THREE.Mesh( geometry, material );
  moon.position.set(posx, posy, posz);
  moon.name = "moon";


  return moon;
}




