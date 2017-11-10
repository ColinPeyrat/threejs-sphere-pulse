import { GUI } from 'dat.gui/build/dat.gui.js';
import * as THREE from 'three';

class Main {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.params = {
      cubeSpeed: 0.05
    };

    this.renderer = new THREE.WebGLRenderer();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.onWindowResize();
    this.bindEvents();
    this.initGui();

    this.animate();
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initGui() {
    const gui = new GUI();
    gui.add(this.params, 'cubeSpeed', 0.01, 0.1);
    return gui;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.cube.rotation.x += this.params.cubeSpeed;
    this.cube.rotation.y += this.params.cubeSpeed;

    this.renderer.render(this.scene, this.camera);
  }
}

export default Main;
