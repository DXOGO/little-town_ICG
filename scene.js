// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};

let car_colors = [0xFF0000, 0xFFFF00, 0x008000, 0x000080, 0xC0C0C0, 0xFFFFFF, 0x3C32A8, 0XFF9021];
let movements = [];

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
    const plane = createPlane(1600,2000);
    sceneGraph.add(plane);
    plane.name = "plane"

     // ************************** //
    // Create roads
    // ************************** //

    sceneGraph.add(createRoad(1600, 150, -200, 0));
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
    // Create lightposts
    // ************************** //

    for (var i = -1000; i < 600; i+=200){
        sceneGraph.add(createPost(i));
    }

    // ************************** //
    // Create buildings
    // ************************** //

    for (var z= -900; z < 0; z+= 300 ){
        sceneGraph.add(createBuilding(z));
    }

    for (var z= 300; z < 900; z+= 300 ){
        sceneGraph.add(createBuilding(z));
    }

    // ************************** //
    // Create football field
    // ************************** //
    sceneGraph.add(createField());

    // ************************** //
    // Create lake
    // ************************** //
    sceneGraph.add(createLake());


    // ************************** //
    // Create sun and moon
    // ************************** //

    // create sun and add pivot light
    const sun = createSun(0, 1100, 0);
    sceneGraph.add(sun);

    const sunPivot = new THREE.Object3D();
    sunPivot.add(sceneElements.sceneGraph.getObjectByName("sunlight"));
    sunPivot.add(sun);
    sceneElements.sceneGraph.add(sunPivot)
    sunPivot.name="sunPivot"

    // create moon and add pivot light
    const moon = createMoon(0, -1100, 0);
    sceneGraph.add(moon);

    const moonPivot = new THREE.Object3D();
    moonPivot.add(sceneElements.sceneGraph.getObjectByName("moonlight"));
    moonPivot.add(moon);
    sceneElements.sceneGraph.add(moonPivot)
    moonPivot.name="moonPivot"

}

function computeFrame() {

    const duck = sceneElements.sceneGraph.getObjectByName("duck");
    duck.rotation.y-=0.01;

    const sun = sceneElements.sceneGraph.getObjectByName("sun");
    const worldPosition = new THREE.Vector3();
    const pos = sun.getWorldPosition( worldPosition );

    // turn off car lights when day
    const bulblight1 = sceneElements.sceneGraph.getObjectByName("light1");
    const bulblight2 = sceneElements.sceneGraph.getObjectByName("light2");

    // get sunlight
    const sunlight = sceneElements.sceneGraph.getObjectByName("sunlight");

    // field lights
    const fl1 = sceneElements.sceneGraph.getObjectByName("light440")
    const fl2 = sceneElements.sceneGraph.getObjectByName("light-440")

    let post_lights = []
    // post lights
    for (var i = -1000; i < 600; i+=200){
        var p = 'postlight'.concat(i);
        p = sceneElements.sceneGraph.getObjectByName("postlight"+i);
        post_lights.push(p);
    }

    let building_lights = []
    // post lights
    for (var i= -900; i < 0; i+= 300 ){
        var b = 'buildinglight'.concat(i);
        b = sceneElements.sceneGraph.getObjectByName("buildinglight"+i);
        building_lights.push(b);
    }
    for (var i= 300; i < 900; i+= 300 ){
        var b = 'buildinglight'.concat(i);
        b = sceneElements.sceneGraph.getObjectByName("buildinglight"+i);
        building_lights.push(b);
    }

    if (pos.y > 0) {

        sceneElements.sceneGraph.background = new THREE.Color(0x91c3ed)
        
        for (var i in post_lights){ post_lights[i].intensity = 0; }
        for (var i in building_lights){ building_lights[i].intensity = 0; }
        bulblight1.intensity = 0;
        bulblight2.intensity = 0;
        sunlight.intensity = 1;
        fl1.intensity = 0;
        fl2.intensity = 0;
    } else {
        
        sceneElements.sceneGraph.background = new THREE.Color(0x090f14)

        for (var i in post_lights){ post_lights[i].intensity = 2; }
        for (var i in building_lights){ building_lights[i].intensity = 1; }
        sunlight.intensity = 0;
        bulblight1.intensity = 2.2;
        bulblight2.intensity = 2.2;
        fl1.intensity = 1.6;
        fl2.intensity = 1.6;
    }

    // rotate sun and moon light
    const lightSun = sceneElements.sceneGraph.getObjectByName("sunPivot");
    const lightMoon = sceneElements.sceneGraph.getObjectByName("moonPivot");
    lightSun.rotation.x -= 0.005;
    lightMoon.rotation.x -= 0.005;

    var disp;

    // CONTROLING THE CAR WITH THE KEYBOARD
    const car = sceneElements.sceneGraph.getObjectByName("car");
    
    if (car.position.x < 570 && car.position.x > -970 && car.position.z < 970  && car.position.z > -970){

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

        if (currx >= 570){ car.position.set((-currx-400)+3.51, 0, currz) } 
        if (currx <= -970) { car.position.set((-currx-400)-3.51, 0, currz)  }
        if (currz >= 970){ car.position.set(currx, 0, -currz+3.51)  } 
        if (currz <= -970) { car.position.set(currx, 0, -currz-3.51)  }
    }

    var r = car_colors[Math.floor(Math.random()*car_colors.length)];

    car.on('click', function(ev) {});    
    const car_main = sceneElements.sceneGraph.getObjectByName("car_main");
    sceneElements.sceneGraph.on('click', ev => {
        car_main.material.color.setHex(r);
    })
    
    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}

