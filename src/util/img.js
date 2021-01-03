/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import * as THREE from "three";

const threejsLoadManager = new THREE.LoadingManager();
const threejsLoader = new THREE.TextureLoader(threejsLoadManager);
const backgroundImages = [
  {
    name: "World Map",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load("./image/worldmap.jpg"),
    }),
  },
  {
    name: "Spring",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load("./image/spring.jpg"),
    }),
  },
  {
    name: "Summer",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load("./image/summer.jpg"),
    }),
  },
  {
    name: "Autumn",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load("./image/autumn.jpg"),
    }),
  },
  {
    name: "Winter",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load("./image/winter.jpg"),
    }),
  },
];

/**
 * load images as threejs' materials
 */
export function getBackgroundImages() {
  return backgroundImages;
}
