/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

/*
  Code modified from "Three.js Primitives" (https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html)
*/

import * as THREE from "three";

const objects = [
  { name: "Box", geometry: () => new THREE.BoxBufferGeometry(8, 8, 8) },
  { name: "Circle", geometry: () => new THREE.CircleBufferGeometry(7, 50) },
  { name: "Cone", geometry: () => new THREE.ConeBufferGeometry(6, 8, 50) },
  {
    name: "Cylinder",
    geometry: () => new THREE.CylinderBufferGeometry(4, 4, 8, 50),
  },
  {
    name: "Dodecahedron",
    geometry: () => new THREE.DodecahedronBufferGeometry(6),
  },
  {
    name: "Icosahedron",
    geometry: () => new THREE.IcosahedronBufferGeometry(7),
  },
  {
    name: "Lathe",
    geometry: () => {
      const points = [];
      for (let i = 0; i < 10; ++i) {
        points.push(
          new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8)
        );
      }
      return new THREE.LatheBufferGeometry(points);
    },
  },
  {
    name: "Octahedron",
    geometry: () => new THREE.OctahedronBufferGeometry(7, 2),
  },
  {
    name: "Parametric",
    geometry: () => {
      function klein(v, u, target) {
        u *= Math.PI;
        v *= 2 * Math.PI;
        u = u * 2;

        let x;
        let z;

        if (u < Math.PI) {
          x =
            3 * Math.cos(u) * (1 + Math.sin(u)) +
            2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
          z =
            -8 * Math.sin(u) -
            2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
        } else {
          x =
            3 * Math.cos(u) * (1 + Math.sin(u)) +
            2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
          z = -8 * Math.sin(u);
        }

        const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
        target.set(x, y, z).multiplyScalar(0.75);
      }

      const slices = 25;
      const stacks = 25;
      return new THREE.ParametricBufferGeometry(klein, slices, stacks);
    },
  },
  { name: "Plane", geometry: () => new THREE.PlaneBufferGeometry(9, 9) },
  { name: "Ring", geometry: () => new THREE.RingBufferGeometry(2, 7, 50) },
  { name: "Sphere", geometry: () => new THREE.SphereBufferGeometry(7, 50, 50) },
  {
    name: "Tetrahedron",
    geometry: () => new THREE.TetrahedronBufferGeometry(7),
  },
  { name: "Torus", geometry: () => new THREE.TorusBufferGeometry(5, 2, 8, 50) },
  {
    name: "TorusKnot",
    geometry: () => new THREE.TorusKnotBufferGeometry(3.5, 1.5, 8, 64, 2, 3),
  },
  {
    name: "Tube",
    geometry: () => {
      class CustomSinCurve extends THREE.Curve {
        constructor(scale) {
          super();
          this.scale = scale;
        }
        getPoint(t) {
          const tx = t * 3 - 1.5;
          const ty = Math.sin(2 * Math.PI * t);
          const tz = 0;
          return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
      }

      const path = new CustomSinCurve(4);
      const tubularSegments = 50; // ui: tubularSegments
      const radius = 1; // ui: radius
      const radialSegments = 50; // ui: radialSegments
      const closed = false; // ui: closed
      return new THREE.TubeBufferGeometry(
        path,
        tubularSegments,
        radius,
        radialSegments,
        closed
      );
    },
  },
];

/**
 * get list of threejs objects
 */
export function getObjects() {
  return objects;
}
