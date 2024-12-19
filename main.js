import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialisation de la scène, de la caméra, et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Ajout d'un cube et d'un helper
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x2e6a2d });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Contrôles pour orbiter (optionnel)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Variables pour la gestion des touches
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};
const cameraSpeed = 0.1;

// Écouteurs d'événements pour les touches
document.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'z': // Avancer
            keys.forward = true;
            break;
        case 's': // Reculer
            keys.backward = true;
            break;
        case 'q': // Gauche
            keys.left = true;
            break;
        case 'd': // Droite
            keys.right = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
        case 'z':
            keys.forward = false;
            break;
        case 's':
            keys.backward = false;
            break;
        case 'q':
            keys.left = false;
            break;
        case 'd':
            keys.right = false;
            break;
    }
});

// Fonction animate avec mise à jour de la caméra
function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if (keys.forward) {
        camera.position.z -= cameraSpeed;
    }
    if (keys.backward) {
        camera.position.z += cameraSpeed;
    }
    if (keys.left) {
        camera.position.x -= cameraSpeed;
    }
    if (keys.right) {
        camera.position.x += cameraSpeed;
    }

    // Rendu de la scène
    renderer.render(scene, camera);
}
