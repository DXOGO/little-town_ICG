"use strict";

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();

        const axesHelper = new THREE.AxesHelper( 50 );
        sceneElements.sceneGraph.add(axesHelper);

        const width = window.innerWidth;
        const height = window.innerHeight;

        // ************************** //
        // Add Perpective camera
        // ************************** //
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
        sceneElements.camera = camera;
        camera.position.set(-300, 200, 300);
        camera.lookAt(0, 0, 0);


        // ************************** //
        // Add Orthographic camera
        // ************************** //
        // const cameraWidth = 4000;
        // const cameraHeight =(cameraWidth / (width / height));

        // const camera = new THREE.OrthographicCamera(
        //     cameraWidth / -10, // left
        //     cameraWidth / 10, // right
        //     cameraHeight / 10, // top
        //     cameraHeight / -10, // bottom
        //     0, // near plane
        //     100 // far plane
        // );
        // sceneElements.camera = camera;
        // camera.position.set(0, 100, 80);
        // camera.lookAt(0, 0, 0);
        // ************************** //
        // NEW --- Control for the camera
        // ************************** //
        sceneElements.control = new THREE.OrbitControls(camera);
        sceneElements.control.screenSpacePanning = true;

        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.5);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add spotlight (with shadows)
        // ***************************** //
        const spotLight = new THREE.SpotLight('rgb(255, 255, 255)', 0.8);
        spotLight.position.set(0, 400, 0);
        sceneElements.sceneGraph.add(spotLight);

        // Setup shadow properties for the spotlight
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        // Give a name to the spot light
        spotLight.name = "light";


        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('lightblue', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};