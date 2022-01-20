import * as THREE from 'three'
import OrbitControls  from'three-orbitcontrols'
import FBXLoader from 'three-fbxloader-offical'
import Stats from './lib/stats.module.js';
let camera, scene, renderer, stats;

init();
animate();
function init() {
    const container = document.querySelector( '#app' );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 2, 18, 28 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#bfe3dd' );

    const HemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    HemisphereLight.position.set( 0, 1, 0 );
    scene.add( HemisphereLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 1, 0 );
    scene.add( dirLight );

    // stats
    stats = new Stats();
    container.appendChild( stats.dom );

    // model
    const loader = new FBXLoader();


    loader.load( 'https://hsd-vr-test.oss-cn-shanghai.aliyuncs.com/mode/qiang.fbx', function ( object ) {
        scene.add( object );
    } );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 12, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    stats.update();
}
