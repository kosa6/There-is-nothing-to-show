/// <reference path="typings/globals/three/index.d.ts" />
/// <reference path="js/three.js" />

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 10;
var camera1 = camera;
var cameraPerspective = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);
cameraPerspective.position.x+=200;
cameraPerspective.position.z+=100;

var raycaster;
var mouse;
var objects = [];

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

var changeCamera = function(){
    controls.enabled = false;
    controls.autoRotate = false;
    camera = cameraPerspective;
}
var stopRotation = function(){
    controls.autoRotate = false;
}
var createPlanet = function(){
    var position = 0;
    var planetSize = [1,3,3,4,20,15,10,9];
    var materialArray = [];
    createMaterialForPlanet(materialArray);
    for(i=0; i<8; i++){
        var geometry = new THREE.SphereGeometry(planetSize[i], 32, 32);
        var sphere = new THREE.Mesh(geometry, materialArray[i]);
        sphere.position.x += position;
        scene.add(sphere);
        position += 50;
        objects.push(sphere);
    }
}
var createMaterialForPlanet = function(materaialArray){
    var loader = new THREE.TextureLoader();

    var colorMap = loader.load("obj/merkury/mercurymap.jpg");
    var normalMap = loader.load("obj/markury/mercurybump.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
        normalMap: normalMap
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/venus/venusmap.jpg");
    var normalMap = loader.load("obj/venus/venusbump.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
        normalMap: normalMap
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/earth/Albedo.jpg");
    var specularMap = loader.load("obj/earth/ocean_Mask.png");
    var normalMap = loader.load("obj/earth/Bump.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
        specularMap: specularMap,
        normalMap: normalMap
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/mars/mars_1k_color.jpg");
    var specularMap = loader.load("obj/mars/marsbump1k.jpg");
    var normalMap = loader.load("obj/mars/mars_1k_normal.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
        specularMap: specularMap,
        normalMap: normalMap
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/jupiter/jupitermap.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/saturn/saturnmap.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/uranus/uranusmap.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
    });

    materaialArray.push(material);

    var colorMap = loader.load("obj/neptun/neptunmap.jpg");
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMap,
    });

    materaialArray.push(material);
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);
var light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light);
/*var spotLight = new THREE.SpotLight(0xFFFFFF, 1);
spotLight.position.set(10, 10, 10);
spotLight.angle = 1;
spotLight.penumbra = 1;
spotLight.decay = 1.3;
spotLight.distance = 100;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);*/

var materialArray = [];
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/ft.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/bk.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/up.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/dn.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/rt.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/lf.png")}));
for (var i = 0; i < 6; i++)
    materialArray[i].side = THREE.DoubleSide;
var skyboxGeom = new THREE.CubeGeometry(5000,5000, 5000, 1, 1,1);
var skybox = new THREE.Mesh(skyboxGeom, materialArray);
scene.add(skybox);

function onDocumentTouchStart( event ) {
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    onDocumentMouseDown( event );
}
function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {
        //intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
        camera = camera1;
        controls.enabled = true;
        controls.autoRotate = true;
        controls.target = intersects[ 0 ].object.position;
    }
}

renderer.domElement.addEventListener( 'webglcontextrestored', function () {
	camera.updateCubeMap( renderer, scene );

} );

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );

var upadate = function () {
    controls.update();
};

var render = function () {
    renderer.render(scene, camera);
}

var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    upadate();
    render();

};

createPlanet();
GameLoop();


