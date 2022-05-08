"use strict";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,  // NEW
    renderer: null,
};


helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

//////////////////////////////////////////////////////////////////


// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {

    // ************************** //
    // Create a ground plane
    // ************************** //
    const texture = new THREE.TextureLoader().load( "resources/grass.jpg" );

    texture.wrapS = THREE.RepeatWrapping; 
    texture.wrapT = THREE.RepeatWrapping;
    // how many times to repeat in each direction; the default is (1,1),
    //   which is probably why your example wasn't working
    texture.repeat.set( 5, 5 ); 

    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 'green', side : THREE.DoubleSide});
    //const planeMaterial = new THREE.MeshStandardMaterial({map: texture, side : THREE.DoubleSide});
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);

    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

     // ************************** //
    // Create a road
    // ************************** //
    const road1 = createRoad(1000, 150);
    sceneGraph.add(road1);

    const road2 = createRoad(150, 500);
    road2.position.x = 150;
    road2.position.z = -250;
    sceneGraph.add(road2);

    const geometry = new THREE.RingGeometry( 100, 225, 60 );
    const material = new THREE.MeshStandardMaterial( { color: 0x0F0F0F, side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    mesh.position.set(-25,1.3,250);
    mesh.receiveShadow = true;
    sceneGraph.add( mesh );

    // ************************** //
    // Create a car
    // ************************** //

    const car = createCar();
    car.position.set(-200,2,0)
    
    sceneGraph.add(car);

    // Name
    car.name = "car";

    // ************************** //
    // Create trees
    // ************************** //

    const tree1 = createTree();
    tree1.position.set(200,0,120)
    sceneGraph.add(tree1);

    //! mudar isto no futuro para uma torre ou isso
    const tree2 = createTree();
    tree2.position.set(-80,0,200)
    sceneGraph.add(tree2);

    const tree3 = createTree();
    tree3.position.set(-150,0,-200)
    sceneGraph.add(tree3);
    
    const tree4 = createTree();
    tree4.position.set(350,0,-400)
    sceneGraph.add(tree4);

    const tree5 = createTree();
    tree5.position.set(-400,0,-380)
    sceneGraph.add(tree5);
    
}
// Displacement value

var delta = 2;

var disp = 2.5;

function computeFrame() {

    // THE SPOTLIGHT

    // Can extract an object from the scene Graph from its name
    // const light = sceneElements.sceneGraph.getObjectByName("light");

    //Apply a small displacement

    // if (light.position.z >= 200) {
    //     delta *= -1;
    // } else if (light.position.z <= -200) {
    //     delta *= -1;
    // }
    // light.translateZ(delta);

    // CONTROLING THE CAR WITH THE KEYBOARD

    const car = sceneElements.sceneGraph.getObjectByName("car");
    const wheels = sceneElements.sceneGraph.getObjectByName("wheels");
    
    if (car.position.x <= 470 && car.position.x >= -470 && car.position.z <= 470  && car.position.z >= -470){
        if (keyW) {
            car.translateX(disp*1.5);
            // ! fix wheel rotation
            wheels.translateZ(0.1);
            console.log(wheels.rotation)
        }
        if (keyA) {
            car.rotation.y += 0.08;
            car.translateZ(-disp);
            car.translateX(disp);
        }
        if (keyS) {
            car.translateX(-disp*1.5);
        }
        if (keyD) {
            car.rotation.y -= 0.08;
            car.translateZ(disp);
            car.translateX(disp);
        }

    } else {
        const currx = car.position.x;
        const currz = car.position.z;
        
        if (currx >= 470){ car.position.set(-currx+2.5, 0, currz) } 
        if (currx <= -470) { car.position.set(-currx-2.5, 0, currz)  }
        if (currz >= 470){ car.position.set(currx, 0, -currz+2.5)  } 
        if (currz <= -470) { car.position.set(currx, 0, -currz-2.5)  }
    }
   

    // Rendering
    helper.render(sceneElements);

    // NEW --- Update control of the camera
    sceneElements.control.update();

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}
