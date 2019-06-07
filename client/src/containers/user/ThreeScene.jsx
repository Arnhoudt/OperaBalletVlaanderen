import React, { Component } from "react";
import * as THREE from "three";
import Canary from "../../three/Canary";
import styles from "./ThreeScene.module.css";
let canary = new Canary();


class ThreeScene extends Component {
  componentDidMount() {
    this.closeUpData = {};
    this.currentColor = {
      r: 0,
      g: 125,
      b: 125
    };
    this.newColor = {
      r: 0,
      g: 125,
      b: 125
    };
    this.changeColor = false;
    this.fonts = {
      helvetacaLight: `assets/fonts/helvetiker_regular.typeface.json`
    };
    this.mouseMoved = false;
    this.mousePosition = {
      x: 0,
      y: 0
    };
    this.lookPosition = {
      x: 0,
      y: 0
    };
    //ADD TEXTURE LOADER
    this.textureLoader = new THREE.TextureLoader();
    //ADD FONT LOADER
    this.fontLoader = new THREE.FontLoader();
    //ADD SCENE
    this.scene = new THREE.Scene();
    {
      const color =
          this.currentColor.b +
          this.currentColor.g * 256 +
          this.currentColor.r * 256 * 256,
        near = 300,
        far = 1600;
      this.scene.fog = new THREE.Fog(color, near, far);
    }
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 1500;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(
      this.currentColor.b +
        this.currentColor.g * 256 +
        this.currentColor.r * 256 * 256
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    //ADD RAYCASTER
    this.raycaster = new THREE.Raycaster();
    //ADD MOUSE
    this.mouse = new THREE.Vector2();
    //CREATE IMAGES
    canary.createImage(
      this,
      `assets/img/pikachu.jpg`,
      200,
      100,
      -300,
      200,
      150
    );
    canary.createImage(
      this,
      `assets/img/pikachu.jpg`,
      -200,
      -100,
      -500,
      200,
      150
    );
    canary.createImage(this, `assets/img/pikachu.jpg`, 200, 0, -700, 200, 150);
    canary.createImage(
      this,
      `assets/img/pikachu.jpg`,
      -150,
      100,
      -800,
      200,
      150
    );
    //CREATE FONTS
    canary.createText(
      this,
      this.fonts.helvetacaLight,
      0xff6690,
      `Pikachu`,
      0,
      0,
      500,
      200
    );
    canary.createText(
      this,
      this.fonts.helvetacaLight,
      0xff6690,
      `Pika Pika`,
      0,
      0,
      -1800,
      200
    );
    //ADD LIGHT
    this.light = new THREE.PointLight(0xffffff, 1, 500);
    this.light.position.set(50, 10, 25);
    this.scene.add(this.light);
    //ADD EVENTLISTENERS
    window.addEventListener(`resize`, this.onResize);
    window.addEventListener(`mousemove`, this.onMouseMove);
    window.addEventListener(`wheel`, this.handleMouseScroll);
    window.addEventListener(`keydown`, this.handleKeyDown);
    window.addEventListener(`click`, this.handleMouseClick);

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

  handleMouseClick = e => {
    e.preventDefault();

    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      if (!this.closeUpObject) {
        this.closeUpData = {
          posX: intersects[0].object.position.x,
          posY: intersects[0].object.position.y,
          posZ: intersects[0].object.position.z,
          rotX: intersects[0].object.rotation.x,
          rotY: intersects[0].object.rotation.y,
          rotZ: intersects[0].object.rotation.z,
          scaleX: intersects[0].object.scale.x,
          scaleY: intersects[0].object.scale.y,
          scaleZ: intersects[0].object.scale.z
        };
        intersects[0].object.position.set(0, 0, this.camera.position.z - 100);
        intersects[0].object.rotation.set(0, 0, 0);
        intersects[0].object.scale.set(60, 40, intersects[0].object.scale.z);
        this.scene.fog = new THREE.Fog(
          this.currentColor.b +
            this.currentColor.g * 256 +
            this.currentColor.r * 256 * 256,
          105,
          120
        );
        this.closeUpObject = intersects[0];
      } else {
        this.closeUpObject.object.position.set(
          this.closeUpData.posX,
          this.closeUpData.posY,
          this.closeUpData.posZ
        );
        this.closeUpObject.object.rotation.set(
          this.closeUpData.rotX,
          this.closeUpData.rotY,
          this.closeUpData.rotZ
        );
        this.closeUpObject.object.scale.set(
          this.closeUpData.scaleX,
          this.closeUpData.scaleY,
          this.closeUpData.scaleZ
        );
        this.scene.fog = new THREE.Fog(
          this.currentColor.b +
            this.currentColor.g * 256 +
            this.currentColor.r * 256 * 256,
          300,
          1600
        );
        this.closeUpObject = undefined;
      }
    }
  };

  handleKeyDown = e => {
    console.log(`I have no idea why you pressed ` + e.key + ` but you did`);
  };

  onMouseMove = event => {
    event.preventDefault();
    this.camera.lookAt(
      -(window.innerWidth / 2 - event.clientX) / 20,
      (window.innerHeight / 2 - event.clientY) / 20,
      this.camera.position.z - 100
    );
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
        //intersects[ 0 ].object.scale.set(intersects[ 0 ].object.scale.x,intersects[ 0 ].object.scale.y+1, intersects[ 0 ].object.scale.z+1);
        intersects[0].object.scale.set(240, 170, intersects[0].object.scale.z);
        this.zoomedObject = intersects[0];
      } else {
        if (this.zoomedObject) {
          this.zoomedObject.object.scale.set(
            200,
            150,
            this.zoomedObject.object.scale.z
          );
          this.zoomedObject = undefined;
        }
      }
    }
  };

  handleMouseScroll = e => {
    if (!this.closeUpObject) {
      this.camera.position.z -= e.deltaY / 3;
      this.scene.children.forEach(child => {
        //alpha = Math.atan((child.position.x - camera.position.x)/(child.position.z - camera.position.z-450));
        //beta = Math.atan((child.position.y - camera.position.y)/(child.position.z -camera.position.z-450));
        //child.rotation.set(-Math.PI*beta, Math.PI*alpha, Math.PI*((camera.position.z)/child.position.z));
        child.lookAt(
          this.camera.position.x,
          this.camera.position.y,
          this.camera.position.z
        );
      });
      if (this.camera.position.z < -1000) {
        this.newColor = {
          r: 125,
          g: 0,
          b: 200
        };
        this.changeColor = true;
      } else {
        this.newColor = {
          r: 0,
          g: 125,
          b: 125
        };
      }
    }
  };

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    //ANIMATION
    if (this.mouseMoved === true) {
      const vx =
        (-(window.innerWidth / 2 - this.mousePosition.x) / 20 -
          this.lookPosition.x) *
        0.03;
      this.lookPosition.x += vx;
      const vy =
        ((window.innerHeight / 2 - this.mousePosition.y) / 20 -
          this.lookPosition.y) *
        0.03;
      this.lookPosition.y += vy;
      const z = this.camera.position.z - 100;
      this.camera.lookAt(this.lookPosition.x, this.lookPosition.y, z);
    }
    if (this.changeColor === true) {
      const rv = Math.round((this.newColor.r - this.currentColor.r) * 0.03);
      this.currentColor.r += rv;
      const gv = Math.round((this.newColor.g - this.currentColor.g) * 0.03);
      this.currentColor.g += gv;
      const bv = Math.round((this.newColor.b - this.currentColor.b) * 0.03);
      this.currentColor.b += bv;
      this.renderer.setClearColor(
        this.currentColor.b +
          256 * this.currentColor.g +
          256 * 256 * this.currentColor.r
      );
    }
    //ANIMATION
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className={styles.div}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
