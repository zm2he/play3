/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import React from "react";
import { Select, Slider } from "antd";
import * as THREE from "three";

import { postEvent } from "./util/event";
import { getBackgroundImages } from "./util/img";
import { getObjects } from "./util/objects";
import store from "./util/store";

const CONFIG_NAME = "effect";
class Effect {
  constructor() {
    let config = store.options[CONFIG_NAME];
    if (!config) {
      store.options[CONFIG_NAME] = {
        imageIndex: 0,
        objectIndex: 0,
      };
      config = store.options[CONFIG_NAME];
    }
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {bool} force - a flag indicates whether needs re-initialize
   */
  init(canvas, force) {}

  /**
   * draw effect, this function will be called many times
   */
  draw() {}

  /**
   * event - this is an optional function for handling inter-component events
   * @param {string} evt
   * @param {object} arg
   */
  event(evt, arg) {}

  /**
   * settings - this is an optional function
   * render of parameters that control the effect
   */
  settings() {
    return [];
  }

  renderSliderOption(name, title, min, max, step, defaultValue) {
    const value = this.getConfig()[name] || defaultValue;
    return (
      <div key={`${name}`} style={{ margin: "8px 0" }}>
        <span>{`${title}: ${value}`}</span>
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          tipFormatter={(value) => `${value}`}
          onChange={(value) => this.changeConfig(name, value)}
        />
      </div>
    );
  }

  renderSelectOption(name, title, options, defaultIndex) {
    const value = this.getConfig()[name] || defaultIndex;
    return (
      <div key={`${name}`} style={{ margin: "8px 0" }}>
        <span>{`${title} `}</span>
        <Select
          style={{ minWidth: "150px", padding: "0 0 0 8px" }}
          value={value}
          onChange={(value) => this.changeConfig(name, value)}
        >
          {options.map((option, index) => {
            return (
              <Select.Option
                key={`option#${index}`}
                value={index}
              >{`${option}`}</Select.Option>
            );
          })}
        </Select>
      </div>
    );
  }

  getConfig() {
    return store.options[CONFIG_NAME];
  }

  changeConfig(name, value) {
    this.getConfig()[name] = value;
    postEvent("event@settings-changed");
  }

  getCurrentObject() {
    const { objectIndex } = this.getConfig();
    const objects = getObjects();
    const idx =
      objectIndex >= 0 && objectIndex < objects.length ? objectIndex : 0;
    return objects[idx];
  }

  getCurrentMaterial() {
    const { imageIndex } = this.getConfig();
    const images = getBackgroundImages();
    const idx = imageIndex >= 0 && imageIndex < images.length ? imageIndex : 0;
    return images[idx].material;
  }

  createSolidMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);
    return material;
  }

  resizeRendererToDisplaySize(canvas, renderer) {
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

export default Effect;
