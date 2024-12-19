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

// Ajout d'un cube
const geometry = new THREE.BoxGeometry();
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('image.png');
const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, cubeMaterial);
cube.position.set(-2, 0, 0); // Positionnement du cube à gauche
scene.add(cube);

// Création d'une pyramide avec UV ajustées
const pyramidGeometry = new THREE.ConeGeometry(1, 2, 3); // Base de 3 segments (triangle)
const texturePyramid = textureLoader.load('image.png');
texturePyramid.wrapS = THREE.RepeatWrapping;
texturePyramid.wrapT = THREE.RepeatWrapping;
texturePyramid.repeat.set(1, 1); // Répéter la texture pour un meilleur rendu

const pyramidMaterial = new THREE.MeshBasicMaterial({ map: texturePyramid });
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.position.set(2, 0, 0); // Positionnement de la pyramide à droite
scene.add(pyramid);

// Création d'une sphère avec texture équirectangulaire
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const textureSphere = textureLoader.load('image.png');
textureSphere.wrapS = THREE.RepeatWrapping;
textureSphere.wrapT = THREE.ClampToEdgeWrapping; // Pour éviter les étirements
textureSphere.repeat.set(1.7, 1.5);

const sphereMaterial = new THREE.MeshBasicMaterial({ map: textureSphere });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0); // Positionnement de la sphère au centre
scene.add(sphere);
// Ajout d'une lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);


// Contrôles pour orbiter
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

    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

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
