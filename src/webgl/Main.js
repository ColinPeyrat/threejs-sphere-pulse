import { GUI } from 'dat.gui/build/dat.gui.js';
import * as THREE from 'three';
import helloWorldVertex from 'shaders/helloWorld.vert';
import helloWorldFragment from 'shaders/helloWorld.frag';

class Main {
  constructor() {
    this.frame = 0;

    this.$el = document.getElementById('app');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.params = {
      cubeSpeed: 0.02,
      pulseSpeed: 0.025
    };

    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      u_amplitude: {
        type: 'f',
        value: 0
      }
    };

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: helloWorldVertex,
      fragmentShader: helloWorldFragment
    });

    const geometry = new THREE.SphereBufferGeometry(1, 16, 16);
    this.sphere = new THREE.Mesh(geometry, material);

    this.displacement = new Float32Array(geometry.attributes.position.count);
    this.populateDisplacementAttribute();
    geometry.addAttribute(
      'displacement',
      new THREE.BufferAttribute(this.displacement, 1)
    );

    this.scene.add(this.sphere);

    this.camera.position.z = 5;

    this.$el.appendChild(this.renderer.domElement);

    this.onWindowResize();
    this.bindEvents();
    this.initGui();

    this.animate();
  }

  populateDisplacementAttribute() {
    for (var v = 0; v < this.displacement.length; v++) {
      this.displacement[v] = Math.random() / 2;
    }
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initGui() {
    const gui = new GUI();
    gui.add(this.params, 'cubeSpeed', 0.01, 0.1);
    gui.add(this.params, 'pulseSpeed', 0.01, 0.075);
    return gui;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.render();
  }

  render() {
    this.uniforms.u_time.value += this.params.pulseSpeed;
    this.uniforms.u_amplitude.value = Math.sin(this.frame);

    // update the frame counter
    this.frame += 0.1;

    this.renderer.render(this.scene, this.camera);
  }
}

export default Main;
