/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import * as THREE from "three";
import Canary from "../../three/Canary";
import Images from "../../three/images";
import Questions from "../../three/Questions";
import ThreeSetup from "../../three/ThreeSetup";

import styles from "./ThreeScene.module.css";
import { POINTER, ANTIALIASING, BACKGROUND_COLORS, CAMERA, FOG, FONTS, WORLD_POSITION, CAMERA_RUBBERBANDING_FORCE } from "../../constants/index";
let canary = new Canary();
let images = new Images();
let questions = new Questions();
let threeSetup = new ThreeSetup();

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.uiStore = props.uiStore;
    this.actStore = props.actStore;
    this.answerStore = props.answerStore;
    this.characterStore = props.characterStore;
    this.questionStore = props.questionStore;
    this.history = props.history;
    this.state = { loading: ``, error: ``, done: false };
  }

  componentDidMount() {
    THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
      const state = { ...this.state };
      state.loading = Math.round((itemsLoaded / itemsTotal) * 100);
      this.setState(state);
    };

    THREE.DefaultLoadingManager.onLoad = () => {
      const state = { ...this.state };
      state.done = true;
      this.setState(state);
      this.cameraRubberBandingActive = true;
    };

    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const state = { ...this.state };
      state.loading = Math.round((itemsLoaded / itemsTotal) * 100);
      this.setState(state);
    };

    THREE.DefaultLoadingManager.onError = url => {
      const state = { ...this.state };
      state.error = url;
      this.setState(state);
    };

    {
      this.pointer = canary.createPointer();
      this.mount.appendChild(this.pointer);
    }

    // variablelen aanmaken (hier mag GEEN data in zitten, dat doe je in de instellingen)
    {
      this.currentWorld = WORLD_POSITION.questions;
      this.closeUpData = {};
      this.currentColor = { ...BACKGROUND_COLORS.images.default };
      this.newColor = this.currentColor;
      this.mouseMoved = false;
      this.mousePosition = { x: 0, y: 0 }; //default waarde zonder betekenis
      this.lookPosition = { x: 0, y: 0 }; //default waarde zonder betekenis
      this.pointerPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; //default waarde zonder betekenis
      this.movementFreedom = CAMERA.movementFreedom;
    }

    threeSetup.setup(this);
    this.cameraRubberBanding.position.set(0, 0, this.currentWorld);

    window.addEventListener(`resize`, this.onResize);

    switch (this.currentWorld) {
      case WORLD_POSITION.images:
        images.load(this, window);
        break;
      case WORLD_POSITION.questions:
      default:
        questions.load(this);
        break;
    }

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    images.unmount(window);
    if (this.renderer) {
      this.mount.removeChild(this.renderer.domElement);
    }
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  //animate en render
  animate = () => {
    //ANIMATION
    if (this.mouseMoved === true) {
      this.camera.position.set(this.camera.position.x - this.lookPosition.x / 2, this.camera.position.y - this.lookPosition.y / 2, this.camera.position.z);
      const vx = canary.rubberBand(this.lookPosition.x, -(window.innerWidth / 2 - this.mousePosition.x) / this.movementFreedom, 0.03);
      const vy = canary.rubberBand(this.lookPosition.y, (window.innerHeight / 2 - this.mousePosition.y) / this.movementFreedom, 0.03);
      this.lookPosition.x += vx;
      this.lookPosition.y += vy;

      this.camera.position.set(this.camera.position.x + this.lookPosition.x / 2, this.camera.position.y + this.lookPosition.y / 2, this.camera.position.z);
      const z = this.camera.position.z - 100;

      this.camera.lookAt(this.lookPosition.x, this.lookPosition.y, z);

      const vpx = canary.rubberBand(this.pointerPosition.x, this.mousePosition.x, 0.2);
      const vpy = canary.rubberBand(this.pointerPosition.y, this.mousePosition.y, 0.2);
      this.pointerPosition.x += vpx;
      this.pointerPosition.y += vpy;

      this.pointer.style.transform =
        `translate(` + (this.pointerPosition.x - POINTER.width / 2) + `px,` + (this.pointerPosition.y - POINTER.height / 2) + `px)`;

      if (this.currentWorld === WORLD_POSITION.images) {
        images.animate();
      }

      if (this.currentWorld === WORLD_POSITION.questions) {
        questions.animate();
      }
    }
    if (this.cameraRubberBandingActive) {
      const cameraVx = canary.rubberBand(this.camera.position.x, this.cameraRubberBanding.position.x, CAMERA_RUBBERBANDING_FORCE);
      const cameraVy = canary.rubberBand(this.camera.position.y, this.cameraRubberBanding.position.y, CAMERA_RUBBERBANDING_FORCE);
      const cameraVz = canary.rubberBand(this.camera.position.z, this.cameraRubberBanding.position.z, CAMERA_RUBBERBANDING_FORCE);
      this.camera.position.set(this.camera.position.x + cameraVx, this.camera.position.y + cameraVy, this.camera.position.z + cameraVz);

      const cameraRotationVx = canary.rubberBand(this.camera.rotation.x, this.cameraRubberBanding.rotation.x, CAMERA_RUBBERBANDING_FORCE);
      const cameraRotationVy = canary.rubberBand(this.camera.rotation.y, this.cameraRubberBanding.rotation.y, CAMERA_RUBBERBANDING_FORCE);
      const cameraRotationVz = canary.rubberBand(this.camera.rotation.z, this.cameraRubberBanding.rotation.z, CAMERA_RUBBERBANDING_FORCE);
      this.camera.rotation.set(this.camera.rotation.x + cameraRotationVx, this.camera.rotation.y + cameraRotationVy, this.camera.rotation.z + cameraRotationVz);
    }

    if (this.currentColor !== this.newColor) {
      const rv = Math.round((this.newColor.r - this.currentColor.r) * 0.03);
      const gv = Math.round((this.newColor.g - this.currentColor.g) * 0.03);
      const bv = Math.round((this.newColor.b - this.currentColor.b) * 0.03);
      this.currentColor.r += rv;
      this.currentColor.g += gv;
      this.currentColor.b += bv;
      this.renderer.setClearColor(this.currentColor.b + 256 * this.currentColor.g + 256 * 256 * this.currentColor.r);
      this.scene.fog = new THREE.Fog(this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256, 300, 1600);
    }
    //ANIMATION
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <>
        <div
          className={styles.div}
          ref={mount => {
            this.mount = mount;
          }}
        />
        {!this.state.done ? (
          <div className={styles.loading}>
            <div className={styles.spinner}>
              <div className={styles.cube1} />
              <div className={styles.cube2} />
            </div>
            <div className={styles.containerPercent}>
              <p>{this.state.loading}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

ThreeScene.propTypes = {
  uiStore: PropTypes.observableObject.isRequired,
  actStore: PropTypes.observableObject.isRequired,
  answerStore: PropTypes.observableObject.isRequired,
  characterStore: PropTypes.observableObject.isRequired,
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`, `actStore`, `answerStore`, `characterStore`, `questionStore`)(observer(ThreeScene));
