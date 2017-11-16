import { GUI } from 'dat.gui/build/dat.gui.js';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
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

    this.controls = new OrbitControls(this.camera);

    this.params = {
      pulseSpeed: 0.05,
      displacementRange: 0.3,
      radius: 1,
      segments: 16
    };

    this.uniforms = {
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

    const geometry = new THREE.SphereBufferGeometry(
      this.params.radius,
      this.params.segments,
      this.params.segments
    );
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
      this.displacement[v] = Math.random() * this.params.displacementRange;
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
    gui.add(this.params, 'pulseSpeed', 0, 0.25);
    gui
      .add(this.params, 'displacementRange', 0, 2)
      .onChange(this.onDisplacementRange.bind(this));
    gui
      .add(this.params, 'radius', 0.1, 3)
      .onChange(this.generateGeometry.bind(this));
    gui
      .add(this.params, 'segments', 4, 512)
      .onChange(this.generateGeometry.bind(this));
  }

  onDisplacementRange(value) {
    this.populateDisplacementAttribute();
  }

  generateGeometry() {
    this.updateGeometry(
      this.sphere,
      new THREE.SphereBufferGeometry(
        this.params.radius,
        this.params.segments,
        this.params.segments
      )
    );
  }

  updateGeometry(mesh, geometry) {
    mesh.geometry.dispose();

    this.displacement = new Float32Array(geometry.attributes.position.count);

    this.populateDisplacementAttribute();

    geometry.addAttribute(
      'displacement',
      new THREE.BufferAttribute(this.displacement, 1)
    );

    mesh.geometry = geometry;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.render();
  }

  render() {
    this.uniforms.u_amplitude.value = Math.sin(this.frame);

    // update the frame counter
    this.frame += this.params.pulseSpeed;

    this.renderer.render(this.scene, this.camera);

    this.sphere.geometry.attributes.displacement.needsUpdate = true;
  }
}

export default Main;
