/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import * as THREE from "three";
import Canary from "../../three/Canary";
import Images from "../../three/Showroom";
import Questions from "../../three/Questions";
import ThreeSetup from "../../three/ThreeSetup";

import styles from "./ThreeScene.module.css";
import { BACKGROUND_COLORS, CAMERA, WORLD_POSITION, CAMERA_RUBBERBANDING_FORCE, FOG, POINTER } from "../../constants/index";

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.canary = new Canary();
    this.images = new Images();
    this.questions = new Questions();
    this.threeSetup = new ThreeSetup();
    this.images.setThis(this);
    this.cameraRubberBandingForce = CAMERA_RUBBERBANDING_FORCE;
    this.fog = {
      near: FOG.near,
      far: FOG.far
    };
    this.uiStore = props.uiStore;
    this.actStore = props.actStore;
    this.answerStore = props.answerStore;
    this.characterStore = props.characterStore;
    this.questionStore = props.questionStore;
    this.history = props.history;
    this.state = { loading: ``, error: ``, done: false };
    this.answers = [];
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
      this.pointer = this.canary.createPointer(POINTER.image);
      this.mount.appendChild(this.pointer);
      this.iconscroll.style.opacity = 0;
    }

    // variablelen aanmaken (hier mag GEEN data in zitten, dat doe je in de instellingen)
    {
      this.cameraRubberBandingActive = false;
      this.currentWorld = CAMERA.position;
      this.closeUpData = {};
      this.currentColor = { ...BACKGROUND_COLORS.images.default };
      this.newColor = this.currentColor;
      this.mouseMoved = false;
      this.mousePosition = { x: 0, y: 0 }; //default waarde zonder betekenis
      this.lookPosition = { x: 0, y: 0 }; //default waarde zonder betekenis
      this.pointerPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; //default waarde zonder betekenis
      this.movementFreedom = CAMERA.movementFreedom;
      this.pointerName = `none`;
    }

    this.threeSetup.setup(this);
    this.cameraRubberBanding.position.set(0, 0, this.currentWorld);
    this.start();

    switch (this.currentWorld) {
      case WORLD_POSITION.images:
        this.images.load(this);
        break;
      case WORLD_POSITION.questions:
        this.questions.load(this);
        break;
      default:
        break;
    }

    window.addEventListener(`resize`, this.onResize);
  }

  componentWillUnmount() {
    this.stop();
    this.images.unmount(window);
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
    if (this.mouseMoved === true && this.state.done) {
      const vx = this.canary.rubberBand(
        this.lookPosition.x,
        -(window.innerWidth / 2 - this.mousePosition.x) / this.movementFreedom,
        this.cameraRubberBandingForce
      );
      const vy = this.canary.rubberBand(
        this.lookPosition.y,
        (window.innerHeight / 2 - this.mousePosition.y) / this.movementFreedom,
        this.cameraRubberBandingForce
      );
      this.lookPosition.x += vx;
      this.lookPosition.y += vy;

      const vpx = this.canary.rubberBand(this.pointerPosition.x, this.mousePosition.x, 0.2);
      const vpy = this.canary.rubberBand(this.pointerPosition.y, this.mousePosition.y, 0.2);
      this.pointerPosition.x += vpx;
      this.pointerPosition.y += vpy;

      this.pointer.style.transform =
        `translate(` + (this.pointerPosition.x - POINTER.width / 2) + `px,` + (this.pointerPosition.y - POINTER.height / 2) + `px)`;

      if (this.currentWorld === WORLD_POSITION.images) {
        this.images.animate();
      }
      if (this.currentWorld === WORLD_POSITION.questions) {
        this.questions.animate();
      }
    }
    if (this.cameraRubberBandingActive && this.state.done) {
      this.camera.position.set(this.camera.position.x - this.lookPosition.x / 2, this.camera.position.y - this.lookPosition.y / 2, this.camera.position.z);
      const cameraVx = this.canary.rubberBand(this.camera.position.x, this.cameraRubberBanding.position.x, 0.03);
      const cameraVy = this.canary.rubberBand(this.camera.position.y, this.cameraRubberBanding.position.y, 0.03);
      const cameraVz = this.canary.rubberBand(this.camera.position.z, this.cameraRubberBanding.position.z, this.cameraRubberBandingForce);
      this.camera.position.set(this.camera.position.x + cameraVx, this.camera.position.y + cameraVy, this.camera.position.z + cameraVz);

      const cameraRotationVx = this.canary.rubberBand(this.camera.rotation.x, this.cameraRubberBanding.rotation.x, 0.03);
      const cameraRotationVy = this.canary.rubberBand(this.camera.rotation.y, this.cameraRubberBanding.rotation.y, 0.03);
      const cameraRotationVz = this.canary.rubberBand(this.camera.rotation.z, this.cameraRubberBanding.rotation.z, CAMERA_RUBBERBANDING_FORCE);
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
    }
    this.scene.fog.color.set(this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256);
    this.scene.fog.near = this.fog.near;
    this.scene.fog.far = this.fog.far;

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

  handleClickPopup = e => {
    if (e.currentTarget.value === `ja`) {
      this.popup.style.transform = `scale(0)`;
      this.cameraRubberBanding.position.set(0, 0, WORLD_POSITION.questions);
      this.movementFreedom = 1200;
      this.questions.questionIndex = 0;
      this.scene.children.forEach(mesh => {
        if (mesh.name) {
          const a = mesh.name.split(`_`);
          if (a[0] === `answer`) {
            let meshText = null;
            this.scene.children.forEach(mesh => {
              if (mesh.name) {
                if (mesh.name.split(`_`)[0] === `answerText`) {
                  if (mesh.name.split(`_`)[3] === a[3]) {
                    meshText = mesh;
                  }
                }
              }
            });
            if (a[4] === `button`) {
              mesh.material.map = this.questions.tex;
              this.questions.selectedAnswers[`${a[1]}${a[2]}`] = false;
            }
            if (a[4] === `beeld`) {
              mesh.material.map = this.questions.imagesUnselected.filter(image => image.image === a[3])[0].tex;
              meshText.material.color.set(0x000000);
              this.questions.selectedAnswers[`${a[1]}${a[2]}`] = false;
            }
            if (a[4] === `geluid`) {
              mesh.material.map = this.questions.soundUnselected;
              meshText.material.color.set(0x000000);
              this.questions.selectedAnswers[`${a[1]}${a[2]}`] = false;
            }
          }
          if (mesh.name === `button` || mesh.name === `volgende_vraag` || mesh.name === `start_questions`) {
            this.scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
            mesh = undefined;
          }
        }
      });
    } else {
      this.movementFreedom = 1200;
      this.popup.style.transform = `scale(0)`;
    }
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
        <div
          className={`${styles.iconscroll}`}
          ref={iconscroll => {
            this.iconscroll = iconscroll;
          }}
        >
          {` `}
        </div>
        <div
          className={styles.popup}
          ref={popup => {
            this.popup = popup;
          }}
        >
          <div className={styles.contentPopup}>
            <h1 className={styles.popupTitle}>Wil je stoppen?</h1>
            <p className={styles.popupText}>
              <span>Ooooohh… dat is jammer!</span> <br />
              Kunnen we je nog overtuigen om verder te gaan met de vragen? Je was namelijk nog maar enkele vragen verwijderd om jouw karakter te weten te komen
              én om gratis tickets te winnen.
            </p>
            <div className={styles.containerButtonsPopup}>
              <button onClick={this.handleClickPopup} value="ja" className={`${styles.buttonPopup} ${styles.ja}`}>
                <p>Ja</p>
              </button>
              <button onClick={this.handleClickPopup} value="neen" className={`${styles.buttonPopup} ${styles.neen}`}>
                <p>Neen</p>
              </button>
            </div>
            <div onClick={this.handleClickPopup} className={styles.cross} />
          </div>
        </div>
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
