/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/*
  Code modified from "Three.js Primitives" (https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html)
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Effect from "./effect";
import { getObjects } from "./util/objects";

class ThreejsEffect extends Effect {
  async init(canvas, force) {
    super.init(canvas, force);
    if (!this.renderer || force) {
      this.canvas = canvas;
      this.renderer = new THREE.WebGLRenderer({ canvas });

      const fov = 75;
      const aspect = canvas.clientWidth / canvas.clientHeight;
      const near = 0.1;
      const far = 1000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.z = 12;

      this.scene = new THREE.Scene();

      let light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(-1, 2, 4);
      this.scene.add(light);
      light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, -2, -4);
      this.scene.add(light);

      this.objects = [];
      const descriptor = this.getCurrentObject();
      const obj = new THREE.Mesh(
        descriptor.geometry(),
        this.getCurrentMaterial()
      );

      this.scene.add(obj);
      this.objects.push(obj);

      // use mouse to control orbit, i.e. rotate/zoom objects
      this.controls = new OrbitControls(this.camera, canvas);
    }
  }

  draw() {
    const { canvas, renderer, camera } = this;
    if (!renderer) {
      return;
    }

    if (this.resizeRendererToDisplaySize(canvas, renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // open the following block if you want auto-rotate object
    const { objects } = this;
    const time = Date.now() * 0.001;
    objects.forEach((obj, ndx) => {
      const speed = 0.2 + ndx * 0.1;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(this.scene, camera);
  }

  settings() {
    return [
      ...super.settings(),
      this.renderSelectOption(
        "objectIndex",
        "Geometry, Object",
        getObjects().map((object) => object.name),
        0
      ),
    ];
  }
}

export default ThreejsEffect;
