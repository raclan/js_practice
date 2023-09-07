import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


// torusknot
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const geometry = new THREE.TorusKnotGeometry(12, 1, 300, 20, 9, 4);
const material = new THREE.MeshStandardMaterial( {color: 0xff00ff, transparent: true, opacity: 0.54} );
// const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const torusknot = new THREE.Mesh(geometry, material);

scene.add(torusknot);


// light
const pointLight = new THREE.PointLight(0xffffff, 150);
pointLight.add(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({color:0x440099})));
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff,0.1);

scene.add(pointLight, ambientLight);


// helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


// controls
const controls = new OrbitControls(camera, renderer.domElement);


// snow
function addSnow() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const snow = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  // const snowLight = new THREE.PointLight(0xffffff, 300);
  // snowLight.add(snow);

  snow.position.set(x, y, z);
  scene.add(snow);
}

Array(81).fill().forEach(addSnow);

const snowTexture = new THREE.TextureLoader().load('snow.png');
scene.background = snowTexture;


// me
const meTexture = new THREE.TextureLoader().load('me.png');
const me = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:meTexture, transparent: true, opacity: 0.9})
);

scene.add(me);


// asa
const asaTexture = new THREE.TextureLoader().load('ASA.jpg');

const asa = new THREE.Mesh(
  new THREE.SphereGeometry(9),
  new THREE.MeshStandardMaterial({map:asaTexture})
);
asa.position.set(27, 9, -27);

scene.add(asa);

// asa.position.z = 30;
// asa.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  asa.rotation.y += 0.05;
  me.rotation.x += 0.09;
  me.rotation.y += 0.06;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// animate
function animate() {
  requestAnimationFrame(animate);

  torusknot.rotation.x += 0.01;
  torusknot.rotation.y += 0.004;
  torusknot.rotation.z += 0.009;

  // asa.rotation.y += 0.1;

  controls.update();

  renderer.render(scene, camera);
}

animate();