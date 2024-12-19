import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const colors = new THREE.Color(0x2e6a2d);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: colors });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var xSpeed = 0.01;
var ySpeed = 0.01;
var zSpeed = 0.01;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        cube.position.y += ySpeed;
    } else if (keyCode == 83) {
        cube.position.y -= ySpeed;
    } else if (keyCode == 65) {
        cube.position.x -= xSpeed;
    } else if (keyCode == 68) {
        cube.position.x += xSpeed;
    } else if (keyCode == 81) {
        cube.position.z += zSpeed;
    } else if (keyCode == 69) {
        cube.position.z -= zSpeed;
    }
}

function animate() {
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
