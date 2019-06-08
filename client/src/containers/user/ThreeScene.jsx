/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import * as THREE from "three";
import Canary from "../../three/Canary";
import Images from "../../three/Images";
import Questions from "../../three/Questions";

import styles from "./ThreeScene.module.css";
import {POINTER, ANTIALIASING, BACKGROUND_COLORS, CAMERA, FOG, FONTS, WORLD_POSITION} from "../../constants/index";
let canary = new Canary();

class ThreeScene extends Component {
  constructor() {
    super();
    this.state = { loading: ``, error: ``, done: false };
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
  }

  componentDidMount() {
    // Maken van een witte bol die de pointer volgt
    {
      this.pointer = document.createElement(`div`);
      this.pointer.innerHTML = `<img src=` + POINTER.image + ` width="` + POINTER.width + `" height="` + POINTER.height + `" alt="">`;
      this.pointer.classList.add(`pointer`);
      this.pointer.style.transform = `translateX(-100px)`;
      this.pointer.style.position = `absolute`;
      this.mount.appendChild(this.pointer);
    }

    // variablelen aanmaken (hier mag GEEN data in zitten, dat doe je in de instellingen)
    {
      this.closeUpData = {};
      this.currentColor = { ...BACKGROUND_COLORS.images.default };
      this.newColor = this.currentColor;

      this.mouseMoved = false;
      this.mousePosition = {
        x: 0,
        y: 0
      }; //default waarde zonder betekenis
      this.lookPosition = {
        x: 0,
        y: 0
      }; //default waarde zonder betekenis
      this.pointerPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }; //default waarde zonder betekenis

      this.movementFreedom = CAMERA.movementFreedom;
    }

    //three variablen zoals loaders, camera's, raycasters en de scene
    {
      //ADD TEXTURE LOADER
      this.textureLoader = new THREE.TextureLoader();
      //ADD FONT LOADER
      this.fontLoader = new THREE.FontLoader();
      //ADD SCENE
      this.scene = new THREE.Scene();
      {
        const color = this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256,
          near = FOG.near,
          far = FOG.far;
        this.scene.fog = new THREE.Fog(color, near, far);
      }
      //ADD CAMERA
      this.camera = new THREE.PerspectiveCamera(CAMERA.fov, CAMERA.aspect, CAMERA.near, CAMERA.far);
      this.camera.position.z = CAMERA.position;
      //ADD RENDERER
      this.renderer = new THREE.WebGLRenderer({ antialias: ANTIALIASING });
      this.renderer.setClearColor(this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.mount.appendChild(this.renderer.domElement);
      //ADD RAYCASTER
      this.raycaster = new THREE.Raycaster();
      this.raycaster = new THREE.Raycaster();
      //ADD MOUSE
      this.mouse = new THREE.Vector2();
    }

    //aanmaken van de images
    {
      //CREATE IMAGES
      canary.createImage(this, `assets/img/pikachu.jpg`, 200, 100, WORLD_POSITION.images - 1800, 200, 150, `showRoomImage`);
      canary.createImage(this, `assets/img/pikachu.jpg`, -200, -100, WORLD_POSITION.images - 2000, 200, 150, `showRoomImage`);
      canary.createImage(this, `assets/img/pikachu.jpg`, 200, 0, WORLD_POSITION.images - 2200, 200, 150, `showRoomImage`);
      canary.createImage(this, `assets/img/pikachu.jpg`, -150, 100, WORLD_POSITION.images - 2300, 200, 150, `showRoomImage`);
      //CREATE FONTS
      canary.createText(this, FONTS.helvetacaLight, 0xff6690, `Pikachu`, 0, 0, WORLD_POSITION.images - 1000, 200);
      canary.createText(this, FONTS.helvetacaLight, 0xff6690, `Pika Pika`, 0, 0, WORLD_POSITION.images - 3300, 200);
    }

    //aanmaken van de questions
    {
      this.questionWrapper = document.createElement(`div`);
      this.questionWrapper.classList.add(`questionWrapper`);

      this.question = document.createElement(`div`);
      this.question.classList.add(`question`);

      this.input = document.createElement(`input`);
      this.submit = document.createElement(`button`);

      this.question.appendChild(this.submit);
      this.question.appendChild(this.input);
      this.questionWrapper.appendChild(this.question);
      this.mount.appendChild(this.questionWrapper);

      this.question.style.position = `absolute`;
      this.question.style.top = `70%`;
      this.question.style.left = `50%`;

      this.input.classList.add(`question_input`);
      this.input.style.transform = `translate(` + - this.input.offsetWidth/2 + `px, ` + 0 + `px) scale(4, 4)`;
      this.input.style.position = `relative`;

      this.submit.innerText = `submit`;
      this.submit.classList.add(`submit`);
      this.submit.style.transform = `translate(` + this.submit.offsetWidth/2  + `px, ` + window.innerHeight / 10 + `px) scale(4, 4)`;
      //this.submit.style.transform = 'rotate('+30+'deg)';
      this.submit.style.position = `relative`;


      canary.createPng(this, `assets/img/ontdek_welk_personage_jij_bent.png`, -150, 100, WORLD_POSITION.questions - 300, 200, 150);
      canary.createText(this, FONTS.helvetacaLight, 0xff6690, `Pikachu`, 0, 30, WORLD_POSITION.questions - 300, 50);
    }

    //eventlisteners
    {
      window.addEventListener(`resize`, this.onResize);
      window.addEventListener(`mousemove`, this.onMouseMove);
      window.addEventListener(`wheel`, this.handleMouseScroll);
      window.addEventListener(`keydown`, this.handleKeyDown);
      window.addEventListener(`click`, this.handleMouseClick);
      const color = this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256,
        near = 300,
        far = 1600;
      this.scene.fog = new THREE.Fog(color, near, far);
    }
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    window.removeEventListener(`resize`, this.onResize);
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
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
      const vx = canary.rubberBand(this.lookPosition.x, -(window.innerWidth / 2 - this.mousePosition.x) / this.movementFreedom, 0.03);
      const vy = canary.rubberBand(this.lookPosition.y, (window.innerHeight / 2 - this.mousePosition.y) / this.movementFreedom, 0.03);
      this.lookPosition.x += vx;
      this.lookPosition.y += vy;
      const z = this.camera.position.z - 100;

      this.camera.lookAt(this.lookPosition.x, this.lookPosition.y, z);

      const vpx = canary.rubberBand(this.pointerPosition.x, this.mousePosition.x, 0.06);
      const vpy = canary.rubberBand(this.pointerPosition.y, this.mousePosition.y, 0.06);
      this.pointerPosition.x += vpx;
      this.pointerPosition.y += vpy;

      this.pointer.style.transform = `translate(` + (this.pointerPosition.x + 16) + `px,` + (this.pointerPosition.y + 16) + `px)`;

      if(CAMERA.position === WORLD_POSITION.questions){
        this.question.style.transform = `perspective(1000px) translate(` + -this.lookPosition.x*10 + `px, ` + this.lookPosition.y*10 + `px)
         rotateX(`+this.lookPosition.y+`deg) rotateY(`+this.lookPosition.x+`deg)`;
      }
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

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  //Handers
  handleMouseClick = e => {
    e.preventDefault();

    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var intersects = this.raycaster.intersectObjects(this.scene.children);
    //de elementen zitten in intersects

    if (intersects.length > 0) {
      //er wordt gecontroleerd of er momenteel naar een object wordt gekeken
      if (this.closeUpObject === undefined) {
        this.closeUpObject = intersects[0];
        this.closeUpData = canary.getPhotoData(this.closeUpObject); // de waarden van de huidige foto worden opgeslagen TODO: dit kan efficienter
        this.closeUpObject.object.position.set(0, 0, this.camera.position.z - 100); //de foto wordt centraal op het scherm van de user geplaatst
        this.closeUpObject.object.rotation.set(0, 0, 0);
        this.closeUpObject.object.scale.set(60, 40, this.closeUpObject.object.scale.z);
        this.scene.fog = new THREE.Fog(this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256, 105, 120);
      } else {
        canary.loadPhotoData(this.closeUpData, this.closeUpObject);
        this.scene.fog = new THREE.Fog(this.currentColor.b + this.currentColor.g * 256 + this.currentColor.r * 256 * 256, 300, 1600);
        this.closeUpObject = undefined;
      }
    }
  };

  handleKeyDown = e => {
    console.log(`I have no idea why you pressed ` + e.key + ` but you did`);
  };

  onMouseMove = event => {
    event.preventDefault();
    this.mouseMoved = true;
    this.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    if (!this.closeUpObject) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0) {
        this.zoomedObject = canary.getClosestObjectWithName(intersects, `showRoomImage`);
        if(this.zoomedObject){
          this.zoomedObject.object.scale.set(240, 170, this.zoomedObject.object.scale.z);
        }
      } else {
        if (this.zoomedObject) {
          this.zoomedObject.object.scale.set(200, 150, this.zoomedObject.object.scale.z);
          this.zoomedObject = undefined;
        }
      }
    }
  };

  handleMouseScroll = e => {
    if (this.closeUpObject === undefined) {
      this.camera.position.z -= e.deltaY / 3;
      this.scene.children.forEach(child => {
        child.lookAt(this.camera.position.x, this.camera.position.y, this.camera.position.z);
      });

      let afstand = -1000000000;
      let color = {};
      Object.entries(BACKGROUND_COLORS.images).forEach(backgroundColor => {
        const bc = { ...backgroundColor[1] };
        if (bc.position < this.camera.position.z && bc.position > afstand) {
          afstand = bc.position;
          color = bc;
        }
      });
      this.newColor = {
        r: color.r,
        g: color.g,
        b: color.b
      };
    }
  };

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
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
            <p>{this.state.loading} %</p>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ThreeScene;
