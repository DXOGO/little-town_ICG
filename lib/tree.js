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

    tree.position.set (50,0,0)

    return tree
}