// PLANE
function createPlane(l,w){

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(l, w), new THREE.MeshStandardMaterial({color: 'green', side : THREE.DoubleSide}));
  plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  plane.receiveShadow = true;
  plane.position.set(-200,0,0)
  plane.name = "name";

  return plane;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
  
  // CAR
  function createCar(posx, posy, posz) {
    const car = new THREE.Group();
    
    createWheels(-20, 12);  
    createWheels(-20, -12);
    createWheels(20, -12);
    createWheels(20, 12);
    
    const main = new THREE.Mesh( new THREE.BoxBufferGeometry(60, 15, 30), new THREE.MeshStandardMaterial({ color: 'red' }) );
    main.position.y = 12;
    main.castShadow = true; main.receiveShadow = true;
    main.name = "car_main";
      
    const cabin = new THREE.Mesh( new THREE.BoxBufferGeometry(33, 11, 24), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    cabin.position.x = -6;
    cabin.position.y = 24.5;
    cabin.castShadow = true; cabin.receiveShadow = true;

    const windowcolor = new THREE.MeshStandardMaterial({ color: 0x333333 });

    const windowback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 18), windowcolor );
    windowback.position.x = -17.8;
    windowback.position.y = 23;

    const sidewindowsback = new THREE.Mesh( new THREE.BoxBufferGeometry(10, 8, 24.3), windowcolor );
    sidewindowsback.position.x = -15;
    sidewindowsback.position.y = 23;
          
    const sidewindowsfront = new THREE.Mesh( new THREE.BoxBufferGeometry(14, 8, 24.3), windowcolor );
    sidewindowsfront.position.x = 0;
    sidewindowsfront.position.y = 23;
            
    const sidewindowsfront2 = new THREE.Mesh( new THREE.CylinderGeometry(5.5, 5.5, 24.3, 3), windowcolor );
    sidewindowsfront2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    sidewindowsfront2.position.x = 7;
    sidewindowsfront2.position.y = 21.5;
      
    const frontwindow = new THREE.Mesh( new THREE.CylinderGeometry(7, 7, 24, 3), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    frontwindow.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    frontwindow.position.x = 10.6;
    frontwindow.position.y = 23;
        
    const frontwindow2 = new THREE.Mesh( new THREE.CylinderGeometry(6.5, 6.5, 20, 3), windowcolor );
    frontwindow2.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    frontwindow2.position.x = 12;
    frontwindow2.position.y = 21.5;
    
    // lights
    let bulb1 = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,4), new THREE.MeshBasicMaterial({ color: 0xffffff}) );
    bulb1.position.set(30, 15, -9.5);
  
    let light1 = new THREE.SpotLight(0xffffff, 3.2, 400, THREE.Math.degToRad(30), 0.4);
    light1.position.set(30, 15, -9.5);
    light1.name = "light1";
    
    let lightTarget1 = new THREE.Object3D();
    lightTarget1.position.set(30, 15, -9.5);
    light1.target = lightTarget1;
    light1.castShadow = true;

    let bulb2 = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,4), new THREE.MeshBasicMaterial({ color: 0xffffff}) );
    bulb2.position.set(30, 15, 9.5);
  
    let light2 = new THREE.SpotLight(0xffffff, 3.2, 400, THREE.Math.degToRad(30), 0.4);
    light2.position.set(30, 15, 9.5);
    light2.name = "light2";
  
    let lightTarget2 = new THREE.Object3D();
    lightTarget2.position.set(30, 15, 9.5);
    light2.target = lightTarget2;
    light2.castShadow = true;
  
    car.add(windowback, frontwindow, frontwindow2, sidewindowsback, sidewindowsfront, sidewindowsfront2,  )
    car.add(bulb1, bulb2, light1, light2, lightTarget1, lightTarget2)
    car.add(main, cabin);

    // WHEELS
    function createWheels(x,z) {

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 8, 8), new THREE.MeshStandardMaterial({ color: 0x333333 }));
      wheel.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      wheel.position.set( x, 6, z )

      wheel.castShadow = true; wheel.receiveShadow = true;
      
      car.add(wheel)
    }

    car.position.set(posx, posy, posz);
    return car;
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////
// TREE
function createTree(posx) {
    //create a group and add the two shapes
    var tree = new THREE.Group();

    var log = new THREE.Mesh( new THREE.CylinderGeometry( 18, 18, 100, 50 ), new THREE.MeshStandardMaterial( {color: 0x964B00} ) );
    log.position.set( 50, 50, 50 )
    log.receiveShadow = true; log.castShadow = true;
    
    tree.add(log);
    
    for (var i= 150; i <= 210; i+=30){
      var leaf = new THREE.Mesh( new THREE.ConeGeometry( 48, 100, 50 ),  new THREE.MeshStandardMaterial( {color: 0x008000} ) );
      leaf.position.set(50,i,50);
      leaf.receiveShadow = true; leaf.castShadow = true;    
      tree.add(leaf)
    }

    tree.position.set(posx, 0, -950);
    return tree
}  

///////////////////////////////////////////////////////////////////////////////////////////////////
// ROAD
function createRoad(l, w, posx, posz) {

  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({ color: 0x0F0F0F, side: THREE.DoubleSide });
  road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 1, posz);
  road.receiveShadow = true;
  
  const geometry = new THREE.PlaneGeometry( l/40, w/20 );
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  
  if (l>w){
    for (var i=posx+50; i < l+posx; i+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      white_line.position.set(-l/2+i, 1.5, posz)
      white_line.receiveShadow = true;
      fullroad.add(white_line);
    }
  }

  if (w>l){
    for (var i=posz+50; i < w+posz; i+=100){
      white_line = new THREE.Mesh( geometry, material );
      white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      white_line.position.set(posx, 1.5, -w/2+i)
      white_line.receiveShadow = true;
      fullroad.add(white_line);
    }
  }
 
  fullroad.add(road);
  return fullroad;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// GARBAGE
function createGarbage(posz, color){
  const can = new THREE.Group();

  const garbage = new THREE.Mesh( new THREE.BoxBufferGeometry(24, 40, 24), new THREE.MeshStandardMaterial({ color: color }) );
  const gcolor = new THREE.Mesh( new THREE.BoxBufferGeometry(8, 8, 15), new THREE.MeshStandardMaterial({ color: 0x1c1c1c }) );
  garbage.position.set(-80,-180, posz);
  gcolor.position.set(-90, -170, posz);
  
  garbage.castShadow = true; garbage.receiveShadow = true;
  can.add(garbage, gcolor);

  return can;
}

// WINDOWS
function createBuildingWindows(posy, posz, z){
  const windows = new THREE.Group();  

  for (var x = -60; x < 80; x +=60){
    for (var y = 150; y > -160; y-=70){
      const window = new THREE.Mesh( new THREE.PlaneGeometry( 35, 45 ), new THREE.MeshStandardMaterial({ color: 0x82fff0, side: THREE.DoubleSide }) );
      const r = new THREE.Mesh( new THREE.BoxBufferGeometry(40, 5, 70), new THREE.MeshStandardMaterial({ color: 0x362d20 }) );
      
      r.castShadow = true; r.receiveShadow = true;
      
      r.position.set(x, y-posy, posz);
      window.position.set(x, y, z)
      windows.add(window, r);
    }
  }
  return windows;
}

// BUILDING
function createBuilding(posz) {

  const building = new THREE.Group();  

  const main = new THREE.Mesh( new THREE.BoxBufferGeometry(200, 400, 100), new THREE.MeshStandardMaterial({ color: 0x7a5030 }) );
  main.castShadow = true; main.receiveShadow = true;
  
  const top = new THREE.Mesh( new THREE.BoxBufferGeometry(160, 420, 80), new THREE.MeshStandardMaterial({ color: 0xedd75c }) );
  top.castShadow = true; top.receiveShadow = true;
  
  const r1 = new THREE.Mesh( new THREE.BoxBufferGeometry(40, 5, 70), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
  r1.position.set(-101, -110, 0);
  r1.castShadow = true; r1.receiveShadow = true;
  
  const door = new THREE.Mesh( new THREE.PlaneGeometry( 35, 70 ), new THREE.MeshStandardMaterial({ color: 0x303030 }) );
  door.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
  door.position.set(-102, -165, 0);
  door.castShadow = true; door.receiveShadow = true;

  let light = new THREE.PointLight(0xffffff, 1, 150);
  light.position.set(-120, -115, 0);
  light.target = new THREE.Vector3();
  
  light.name = "buildinglight"+posz

  building.add( main, top, door, r1, light);
  building.add( createGarbage(100, 0x34eb23), createGarbage(140, 0xfff821), createGarbage(180, 0x339de8) );
  building.add( createBuildingWindows(23, 25, 55), createBuildingWindows(-23, -25, -55) );

  building.position.set(350, 200, posz)
  return building
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LIGHT POSTS
function createPost(posx) {
  const lightpost = new THREE.Group();  

  const post = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 120, 50 ), new THREE.MeshStandardMaterial( {color: 0x242424} ) );
  post.position.set(50,60,50)
  post.receiveShadow = true; post.castShadow = true;
  
  const holder = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 50, 50 ), new THREE.MeshStandardMaterial( {color: 0x242424} ) );
  holder.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  holder.position.set(50,120,29);
  holder.receiveShadow = true; holder.castShadow = true;
  
  let bulb = new THREE.Mesh(new THREE.BoxBufferGeometry(4,4,15), new THREE.MeshBasicMaterial({ color: 0xffffff}) );
  bulb.position.set(50, 117.5, 12);
  bulb.receiveShadow = true; bulb.castShadow = true;
  
  let light = new THREE.PointLight(0xffffff, 2, 180);
  light.position.set(50, 120, -39);
  
  light.name = "postlight"+posx

  lightpost.add(post, holder, bulb, light);

  lightpost.position.set(posx, 0, 50);
  return lightpost
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

///////////////////////////////////////////////////////////////////////////////////////////////////
// GOAL POSTS
function createGoalPost(posx, movx, angle){
  const goal = new THREE.Group();
  
  const postGeometry = new THREE.CylinderGeometry( 2, 2, 60, 50 );
  const barGeometry = new THREE.CylinderGeometry( 2, 2, 105, 50 );
  const backbarGeometry = new THREE.CylinderGeometry( 2, 2, 71, 50 );
  const sidepostGeometry = new THREE.CylinderGeometry( 2, 2, 38, 50 );
  const postMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  
  const lp = new THREE.Mesh( postGeometry, postMaterial );
  lp.position.set(posx,30,-50)
  lp.receiveShadow = true; lp.castShadow = true;

  const rp = new THREE.Mesh( postGeometry, postMaterial );
  rp.position.set(posx,30,50)
  rp.receiveShadow = true; rp.castShadow = true;
  
  const blp = new THREE.Mesh( backbarGeometry, postMaterial );
  blp.rotateOnAxis(new THREE.Vector3(0, 0, angle), Math.PI/6);
  blp.position.set(posx-movx,30,-50)
  blp.receiveShadow = true; blp.castShadow = true;

  const brp = new THREE.Mesh( backbarGeometry, postMaterial );
  brp.rotateOnAxis(new THREE.Vector3(0, 0, angle), Math.PI/6);
  brp.position.set(posx-movx,30, 50)
  brp.receiveShadow = true; brp.castShadow = true;

  const cb = new THREE.Mesh( barGeometry, postMaterial );
  cb.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  cb.position.set(posx,60,0)
  cb.receiveShadow = true; cb.castShadow = true;
  
  const bp = new THREE.Mesh( barGeometry, postMaterial );
  bp.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  bp.position.set(posx-movx*2,1,0)
  bp.receiveShadow = true; bp.castShadow = true;
  
  const lsp = new THREE.Mesh( sidepostGeometry, postMaterial );
  lsp.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  lsp.position.set(posx-movx,1,-50)
  lsp.receiveShadow = true; lsp.castShadow = true;

  const rsp = new THREE.Mesh( sidepostGeometry, postMaterial );
  rsp.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  rsp.position.set(posx-movx,1,50)
  rsp.receiveShadow = true; rsp.castShadow = true;

  goal.add(lp, blp, brp, rp, blp, cb, bp, lsp, rsp);

  return goal;
}

// FIELD LINES
function createFieldLine(w,h, posx, posz){
  
  const line = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({color: 0xffffff, side : THREE.DoubleSide}));
  line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  line.receiveShadow = true;

  line.position.set(posx, 3, posz)

  return line;
}


// FOOTBALL FIELD
function createField(){
  const field = new THREE.Group();

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(900, 500), new THREE.MeshStandardMaterial({color: 0x8a3333, side : THREE.DoubleSide}));
  floor.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  floor.receiveShadow = true;
  
  const goal1 = createGoalPost(-380, 17.5, -1)
  const goal2 = createGoalPost(380, -17.5, 1)

  const array = [0, -380, 380]
  for (var i in array){ field.add(createFieldLine(5, 450, array[i], 0)); }

  const array2 = [-223, 223]
  for (var i in array2){ field.add(createFieldLine(765, 5, 0, array2[i])); }

  // center ring
  const mesh = new THREE.Mesh( new THREE.RingGeometry( 110, 115, 32 ), new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide }) );
  mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  mesh.position.y = 3;
  mesh.receiveShadow = true;


  // FIELD LIGHTS
  function createFieldLight(posx, posy, posz){

    const lightpost = new THREE.Group();  

    const post = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, 240, 50 ), new THREE.MeshStandardMaterial( {color: 0x242424} ) );
    post.position.set(posx, posy, posz)
    post.receiveShadow = true; post.castShadow = true;
    
    let light = new THREE.SpotLight(0xffffff, 1.6, 1400, Math.PI/4, 0.8);
    light.position.set(posx, posy*2, posz);
    light.target = field;

    light.name = "light"+posx
    
    let bulb = new THREE.Mesh(new THREE.SphereGeometry(10,10,30), new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    bulb.position.set(posx, posy*2, posz);
    bulb.receiveShadow = true; bulb.castShadow = true;
     
    let light2 = new THREE.PointLight(0xffffff, 1, 300);
    light2.position.set(posx, posy*2+100, posz);
    
    field.add(post, light, bulb, light2);

    return lightpost;
  }

  // lightposts
  createFieldLight(440, 120, 240)
  createFieldLight(-440, 120, -240)

  field.add(goal1, goal2);
  field.add(floor, mesh);

  field.position.set(-500,2,500);
  return field;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LAKE
function createLake(){
  const lake = new THREE.Group();

  createDuck();
  createRock();
  createWater();
  
  // ROCK model from https://github.com/marcaaron/threejs-rock
  function createRock(){
      var texture = new THREE.TextureLoader().load( 'resources/rock.jpg' );
      var loader = new THREE.OBJLoader();

      loader.load(
        // resource URL
        'models/rock.obj',
        // called when resource is loaded
        function ( object ) {
          // object.position.set(-450, -30, -600)
          object.traverse(function (child) {

                  if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                    child.castShadow = true;
                  }
              });
          lake.add( object);
        }
      );
  }

  // WATER
  function createWater(){
    const texture = new THREE.TextureLoader().load( 'resources/water.jpg' );
    const water = new THREE.Mesh(new THREE.BoxBufferGeometry(600, 600, 20), new THREE.MeshStandardMaterial({map: texture}));
    water.translateY(10);
    water.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    water.receiveShadow = true;

    const floor = new THREE.Mesh(new THREE.BoxBufferGeometry(680, 680, 15), new THREE.MeshStandardMaterial({color: 0xffffff}));
    floor.translateY(7.5);
    floor.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    floor.receiveShadow = true;

    const wall1 = new THREE.Mesh( new THREE.BoxBufferGeometry(600, 30, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    wall1.position.set(0, 15, -305);
    wall1.castShadow = true; wall1.receiveShadow = true;

    const wall2 = new THREE.Mesh( new THREE.BoxBufferGeometry(600, 30, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    wall2.position.set(0, 15, 305);
    wall2.castShadow = true; wall2.receiveShadow = true;

    const wall3 = new THREE.Mesh( new THREE.BoxBufferGeometry(620, 30, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    wall3.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    wall3.position.set(-305, 15, 0);
    wall3.castShadow = true; wall3.receiveShadow = true;

    const wall4 = new THREE.Mesh( new THREE.BoxBufferGeometry(620, 30, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }) );
    wall4.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    wall4.position.set(305, 15, 0);
    wall4.castShadow = true; wall4.receiveShadow = true;


    lake.add( water, wall1, wall2, wall3, wall4, floor );
  }

  function createDuck(){
    const duck = new THREE.Group();

    const bodycolor = new THREE.MeshStandardMaterial( {color: 0xf8fc03} );
 
    const body = new THREE.Mesh( new THREE.BoxBufferGeometry( 24, 12, 14 ), bodycolor );
    body.position.set( 0, 26, 200 );
    body.castShadow = true; body.receiveShadow = true;

    const wings = new THREE.Mesh( new THREE.BoxBufferGeometry( 10, 6, 18 ), bodycolor );
    wings.position.set( 4, 28, 200 );
    wings.castShadow = true; wings.receiveShadow = true;

    const head = new THREE.Mesh( new THREE.BoxBufferGeometry( 10, 8, 8 ), bodycolor );
    head.position.set( -6, 36, 200 );
    head.castShadow = true; head.receiveShadow = true;

    const geometrybeak = new THREE.BoxBufferGeometry( 6, 2, 4 );
    const materialbeak = new THREE.MeshStandardMaterial( {color: 0xfc5a03} );
    const beak = new THREE.Mesh( geometrybeak, materialbeak );
    beak.position.set( -14, 34, 200 );
    beak.castShadow = true; beak.receiveShadow = true;

    const eye = new THREE.SphereGeometry( 2.1, 32, 32 )
    const eyecolor = new THREE.MeshBasicMaterial( { color: 0x000000});

    const leye = new THREE.Mesh(eye, eyecolor);
    leye.position.set( -8, 36.5, 197 );

    const reye = new THREE.Mesh( eye, eyecolor);
    reye.position.set( -8, 36.5, 203 );
    
    duck.add(body, wings, head, beak, leye, reye)
    duck.name = "duck";

    lake.add(duck)
  }

  lake.position.set(-400, 0, -500)
  return lake;
}


