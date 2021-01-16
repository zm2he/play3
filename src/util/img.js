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
      map: threejsLoader.load(
        "http://52.73.210.69:80/images/9d24372e67aebe4db3df48f72c79a47aleWPD7dIo+"
      ),
    }),
  },
  {
    name: "Spring",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load(
        "http://52.73.210.69:80/images/9d24372e67aebe4db3df48f72c79a47aksZET-Qui+"
      ),
    }),
  },
  {
    name: "Summer",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load(
        "http://52.73.210.69:80/images/9d24372e67aebe4db3df48f72c79a47aQonIpfk-u+"
      ),
    }),
  },
  {
    name: "Autumn",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load(
        "http://52.73.210.69:80/images/9d24372e67aebe4db3df48f72c79a47aQonIpfk-u+"
      ),
    }),
  },
  {
    name: "Winter",
    material: new THREE.MeshBasicMaterial({
      map: threejsLoader.load(
        "http://52.73.210.69:80/images/9d24372e67aebe4db3df48f72c79a47al0CApRD7i+"
      ),
    }),
  },
];

/**
 * load images as threejs' materials
 */
export function getBackgroundImages() {
  return backgroundImages;
}
