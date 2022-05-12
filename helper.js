const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();
        
        // var fogColor = new THREE.Color(0x3db8ff);
        // sceneElements.sceneGraph.background = fogColor; // Setting fogColor as the background color also
        // sceneElements.sceneGraph.fog = new THREE.Fog(fogColor, 1900, 2900);

        const axesHelper = new THREE.AxesHelper( 500 );
        sceneElements.sceneGraph.add(axesHelper);

        const width = window.innerWidth;
        const height = window.innerHeight;

        // ************************** //
        // Add Perpective camera
        // ************************** //
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
        sceneElements.camera = camera;
        camera.position.set(-1600, 520, 0);
        camera.lookAt(0,0,0);


        // ************************** //

        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add spotlight (with shadows)
        // ***************************** //
        const sunLight = new THREE.SpotLight(0xffffff, 1, 5000, 1.8);
        sunLight.position.set(0, 1100, 0);
        sceneElements.sceneGraph.add(sunLight);

        // Setup shadow properties for the sunlight
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;

        // Give a name to the spot light
        sunLight.name = "sunlight";

        // const spotLightHelper = new THREE.SpotLightHelper( sunLight );
        // sceneElements.sceneGraph.add( spotLightHelper );

        const moonLight = new THREE.SpotLight(0xffffff, 0.1, 0, 2);
        moonLight.position.set(0, -1100, 0);
        sceneElements.sceneGraph.add(moonLight);

        // Setup shadow properties for the moonlight
        moonLight.castShadow = true;
        moonLight.shadow.mapSize.width = 2048;
        moonLight.shadow.mapSize.height = 2048;

        // Give a name to the spot light
        moonLight.name = "moonlight";

        // const spotLightHelper2 = new THREE.SpotLightHelper( moonLight );
        // sceneElements.sceneGraph.add( spotLightHelper2 );


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

        // NEW --- Control for the camera
        // ************************** //
        sceneElements.control = new THREE.OrbitControls(camera, renderer.domElement);
        sceneElements.control.screenSpacePanning = true;
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};