/*
  Bruce's personal project
  Copyright (c) 2021 brucehe<bruce.he.62@gmail.com>
  
  See LICENSE.txt for more information
*/

import React, { Suspense } from "react";
import { Drawer, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import "./index.css";
import { subscribeEvent, unsubscribeEvent } from "./util/event";
import store, { init, serialize, deserialize } from "./util/store";
import { getBackgroundImages } from "./util/img";
import ThreejsEffect from "./three";

class Effects extends React.Component {
  constructor(props) {
    super(props);

    window.requestAnimFrame = () => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    };

    window.cancelAnimFrame = (id) => {
      return (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function (id) {
          window.clearTimeout(id);
        }
      );
    };

    this.initEffect = this.initEffect.bind(this);
    this.drawEffect = this.drawEffect.bind(this);
    this.onSettingsChanged = this.onSettingsChanged.bind(this);
    this.onToggleSettings = this.onToggleSettings.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStop = this.onStop.bind(this);

    deserialize();

    this.effect = new ThreejsEffect();
    this.canvas = undefined;
  }

  componentDidMount(props) {
    init().then(() => {
      this.onRun();
    });
    subscribeEvent("3js", this.onEvent);
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    this.onStop();
    serialize();
    unsubscribeEvent("3js", this.onEvent);
  }

  onResize() {
    this.initEffect(true);
    this.forceUpdate();
  }

  onEvent(evt, arg) {
    console.log(`3js: ${evt}`);
    switch (evt) {
      case "event@settings-changed":
        this.onSettingsChanged();
        break;

      case "event@refresh":
        this.forceUpdate();
        break;

      default:
        break;
    }
  }

  onRun() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    this.running = true;
    this.raf = requestAnimationFrame(this.drawEffect);
  }

  onStop() {
    this.running = false;
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    this.raf = undefined;
  }

  onSettingsChanged() {
    this.initEffect(true);
    serialize();
    this.forceUpdate();
  }

  onToggleSettings(e) {
    store.settingsOpended = !store.settingsOpended;
    if (store.settingsOpended) {
      this.onStop();
    } else {
      const { effect } = this;
      if (effect && effect.configChanged) {
        effect.configChanged();
      }
      this.onRun();
    }
    this.forceUpdate();
  }

  initEffect(force) {
    const { container, effect, canvas } = this;
    if (container && effect && canvas) {
      effect.width = ~~(container.width || container.clientWidth);
      effect.height = ~~(container.height || container.clientHeight);
      effect.init(canvas, force);
    }
  }

  drawEffect() {
    const { effect, canvas, running } = this;
    if (effect) {
      if (running) {
        if (canvas) {
          effect.draw();
        }
      }
      requestAnimationFrame(this.drawEffect);
    }
  }

  renderBackgorundImageOption() {
    const { effect } = this;
    return (
      <div
        key={"effect#BackgroundImage"}
        className="underline"
        style={{ padding: "8px 0" }}
      >
        <span>{"Background Image"}</span>
        <Select
          style={{ minWidth: "150px", margin: "0 0 0 8px" }}
          value={effect.getConfig().imageIndex || 0}
          placeholder="Select an image"
          onChange={(value) => {
            effect.getConfig().imageIndex = value;
            this.onSettingsChanged();
          }}
        >
          {getBackgroundImages().map((backgroundImg, index) => {
            return (
              <Select.Option
                key={`effect#${index}`}
                value={index}
              >{`${backgroundImg.name}`}</Select.Option>
            );
          })}
        </Select>
      </div>
    );
  }

  renderSettings() {
    const { effect } = this;
    const settings = [this.renderBackgorundImageOption()];
    const effectSettings = effect.settings();
    if (effectSettings.length > 0) {
      settings.push(
        <div style={{ padding: "8px", background: "#efefef" }}>
          {effectSettings}
        </div>
      );
    }
    return settings;
  }

  renderEffect(props = {}) {
    return (
      <canvas
        key="3d-canvas"
        ref={(e) => {
          if (e) {
            const changedCanvas = this.canvas !== e;
            this.canvas = e;
            this.initEffect(changedCanvas);
          }
        }}
        style={{ width: "100vw", height: "100vh", background: "black" }}
      />
    );
  }

  render() {
    const { settingsOpended } = store;

    return (
      <div className="app-container">
        <Suspense
          fallback={<div style={{ margin: "16px" }}>{`Loading...`}</div>}
        >
          <div
            ref={(e) => {
              if (e) {
                this.container = e;
                this.initEffect(true);
              }
            }}
            style={{ width: "100vw", height: "100vh" }}
          >
            {this.renderEffect()}
            <span
              className="app-setting"
              onClick={() => this.onToggleSettings()}
            >
              <SettingOutlined />
            </span>
            <Drawer
              title="Settings"
              placement="right"
              closable={true}
              width={Math.min(400, this.container?.width || 400)}
              onClose={() => this.onToggleSettings()}
              visible={settingsOpended}
            >
              {this.renderSettings()}
            </Drawer>
          </div>
        </Suspense>
      </div>
    );
  }
}

export default Effects;
