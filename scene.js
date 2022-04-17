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
    const planeGeometry = new THREE.PlaneGeometry(600, 600);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 'green', side: THREE.DoubleSide });
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);

    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

     // ************************** //
    // Create a road
    // ************************** //
    const roadGeometry = new THREE.PlaneGeometry(600, 100);
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x0F0F0F, side: THREE.DoubleSide });
    const roadObject = new THREE.Mesh(roadGeometry, roadMaterial);
    sceneGraph.add(roadObject);

    // Change orientation of the road using rotation
    roadObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    roadObject.position.y=0.2;
    // Set shadow property
    roadObject.receiveShadow = true;


    // ************************** //
    // Create a car
    // ************************** //

    const car = createCar();
    sceneGraph.add(car);
    
    // Name
    car.name = "car";

    // ************************** //
    // Create a tree
    // ************************** //

    const tree = createTree();
    tree.position.set (50,0,0)
    sceneGraph.add(tree);

    // Name
    tree.name = "tree";
    
}
// Displacement value

var delta = 2;

var dispX = 2.5, dispZ = 2.5;

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

    if (keyW && car.position.x < 250) {
        car.translateX(dispX);
    }
    // if (keyA && car.position.z > -250) {
    //     car.translateZ(-dispZ);
    // }
    if (keyS && car.position.x > -250) {
        car.translateX(-dispX);
    }
    // if (keyD && car.position.z < 250) {
    //     car.translateZ(dispZ);
    // }

    // Rendering
    helper.render(sceneElements);

    // NEW --- Update control of the camera
    sceneElements.control.update();

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}