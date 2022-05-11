// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};


helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false, keyShift= false;
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
        case 16: //shift
            keyShift = true;
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
        case 16: //shift
            keyShift = false;
            break;
    }
}

//////////////////////////////////////////////////////////////////


// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {

    // ************************** //
    // Create a ground plane
    // ************************** //
    sceneGraph.add(createPlane(2000,2000));

     // ************************** //
    // Create roads
    // ************************** //

    sceneGraph.add(createRoad(2000, 150, 0, 0));
    sceneGraph.add(createRoad(150, 925, 150, -535));
    sceneGraph.add(createRoad(150, 925, 150, 535));

    // ************************** //
    // Create a car
    // ************************** //

    const car = createCar(-700, 2, 40);
    sceneGraph.add(car);

    // Name
    car.name = "car";

    // ************************** //
    // Create trees
    // ************************** //

    for (var i = -100; i > -1000; i-=200){
        sceneGraph.add(createTree(i));
    }

     // ************************** //
    // Create trees
    // ************************** //

    for (var i = -1000; i < 1000; i+=200){
        sceneGraph.add(createPost(i));
    }

      // ************************** //
    // Create trees
    // ************************** //

    for (var i= -900; i < 0; i+= 300 ){
        const b = sceneGraph.add(createBuilding(i));

    }
    
    // ************************** //
    // Create sun and moon
    // ************************** //

    const sun = createSun(0, 1100, 0);
    sceneGraph.add(sun);

    const sunPivot = new THREE.Object3D();
    sunPivot.add(sceneElements.sceneGraph.getObjectByName("sunlight"));
    sunPivot.add(sun);
    sceneElements.sceneGraph.add(sunPivot)
    sunPivot.name="sunPivot"

    const moon = createMoon(0, -1100, 0);
    sceneGraph.add(moon);

    const moonPivot = new THREE.Object3D();
    sunPivot.add(sceneElements.sceneGraph.getObjectByName("moonlight"));
    moonPivot.add(moon);
    sceneElements.sceneGraph.add(moonPivot)
    moonPivot.name="moonPivot"

}


function computeFrame() {

    const sun = sceneElements.sceneGraph.getObjectByName("sun");
    const worldPosition = new THREE.Vector3();
    const pos = sun.getWorldPosition( worldPosition );

    const light1 = sceneElements.sceneGraph.getObjectByName("light1");
    const light2 = sceneElements.sceneGraph.getObjectByName("light2");

    if (pos.y > 0) {
        light1.intensity = 0;
        light2.intensity = 0;
    } else {
        light1.intensity = 2.2;
        light2.intensity = 2.2;
    }

    const lightSun = sceneElements.sceneGraph.getObjectByName("sunPivot");
    const lightMoon = sceneElements.sceneGraph.getObjectByName("moonPivot");
    lightSun.rotation.x -= 0.008;
    lightMoon.rotation.x -= 0.008;

    var disp;

    // CONTROLING THE CAR WITH THE KEYBOARD

    const car = sceneElements.sceneGraph.getObjectByName("car");
    
    if (car.position.x <= 970 && car.position.x >= -970 && car.position.z <= 970  && car.position.z >= -970){
        // console.log("x", car.position.x)
        // console.log("z", car.position.z)

        if (keyShift){ disp=7; } else { disp=3.5; }

        if (keyW) {
            car.translateX(disp*1.5);
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
        
        if (currx >= 970){ car.position.set(-currx+3.51, 0, currz) } 
        if (currx <= -970) { car.position.set(-currx-3.51, 0, currz)  }
        if (currz >= 970){ car.position.set(currx, 0, -currz+3.51)  } 
        if (currz <= -970) { car.position.set(currx, 0, -currz-3.51)  }
    }
   

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}

