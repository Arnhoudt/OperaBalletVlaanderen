import * as THREE from "three";
import {
  BACKGROUND_COLORS,
  FONTS,
  HOME_IMAGE_SIZE_LARGER,
  HOME_IMAGE_SIZE,
  WORLD_POSITION,
  SHOWROOM_MAX_X_ROTATION,
  SHOWROOM_MAX_Y_ROTATION,
  SHOWROOM_MAX_Z_ROTATION,
  FOG
} from "../constants";
import Canary from "./Canary";

class Images {
  canary = new Canary();

  setThis = that => {
    this.that = that;
  };

  load = that => {
    this.that = that;
    this.that.cameraRubberBandingForce = 1;
    that.movementFreedom = 500;
    that.cameraRubberBandingActive = true;

    this.that.fog = { near: FOG.near, far: FOG.far };

    //CREATE IMAGES
    this.canary.createImage(
      that,
      `assets/img/jouwKarakter1.png`,
      300,
      150,
      WORLD_POSITION.images - 800,
      1920 / HOME_IMAGE_SIZE,
      1080 / HOME_IMAGE_SIZE,
      `showRoomImage`
    );
    this.canary.createImage(
      that,
      `assets/img/jouwKarakter2.png`,
      -250,
      -100,
      WORLD_POSITION.images - 1200,
      1920 / HOME_IMAGE_SIZE,
      1080 / HOME_IMAGE_SIZE,
      `showRoomImage`
    );
    this.canary.createImage(
      that,
      `assets/img/jouwKarakter3.png`,
      200,
      0,
      WORLD_POSITION.images - 1600,
      1920 / HOME_IMAGE_SIZE,
      1080 / HOME_IMAGE_SIZE,
      `showRoomImage`
    );
    this.canary.createImage(
      that,
      `assets/img/jouwKarakter4.png`,
      -200,
      200,
      WORLD_POSITION.images - 2000,
      1920 / HOME_IMAGE_SIZE,
      1080 / HOME_IMAGE_SIZE,
      `showRoomImage`
    );
    this.canary.createImage(
      that,
      `assets/img/jouwKarakter5.png`,
      0,
      0,
      WORLD_POSITION.images - 2500,
      1920 / HOME_IMAGE_SIZE,
      1080 / HOME_IMAGE_SIZE,
      `showRoomImage`
    );
    //CREATE TEXT
    this.canary.createText(that, `Pikachu`, FONTS.radikalRegular, 20, 0xff6690, 0, 0, WORLD_POSITION.images - 1000);
    this.canary.createHollowText(that, FONTS.radikalRegular, 0xff6690, `Pika Pika`, 0, 0, WORLD_POSITION.images - 3300, 200);

    //eventlisteners
    window.addEventListener(`mousemove`, this.onMouseMove);
    window.addEventListener(`wheel`, this.handleMouseScroll);
    window.addEventListener(`click`, this.handleMouseClick);
    const color = that.currentColor.b + that.currentColor.g * 256 + that.currentColor.r * 256 * 256;
    let near = 300;
    let far = 1600;
    that.scene.fog = new THREE.Fog(color, near, far);
  };

  unmount = () => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`click`, this.handleMouseClick);
  };
  //Handerse

  handleMouseClick = e => {
    e.preventDefault();

    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
    let intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
    //de elementen zitten in intersects

    if (intersects.length > 0) {
      //er wordt gecontroleerd of er momenteel naar een object wordt gekeken
      if (this.that.closeUpObject === undefined) {
        this.that.closeUpObject = intersects[0];
        // de waarden van de huidige foto worden opgeslagen TODO: dit kan efficienter
        this.that.closeUpData = this.canary.getPhotoData(this.that.closeUpObject);
        //de foto wordt centraal op het scherm van de user geplaatst
        this.that.closeUpObject.object.position.set(this.that.camera.position.x, this.that.camera.position.y, this.that.camera.position.z - 100);
        this.that.closeUpObject.object.rotation.set(0, 0, 0);
        this.that.closeUpObject.object.scale.set(60, 40, this.that.closeUpObject.object.scale.z);
        this.that.fog.near = 105;
        this.that.fog.far = 120;
      } else {
        this.canary.loadPhotoData(this.that.closeUpData, this.that.closeUpObject);
        this.that.fog.near = 300;
        this.that.fog.far = 1600;
        this.that.scene.fog = new THREE.Fog(this.that.currentColor.b + this.that.currentColor.g * 256 + this.that.currentColor.r * 256 * 256, 300, 1600);
        this.that.closeUpObject = undefined;
      }
    }
  };

  onMouseMove = event => {
    event.preventDefault();
    this.that.mouseMoved = true;
    this.that.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    if (!this.that.closeUpObject) {
      console.log(`not close up`);
      this.that.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.that.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
      let intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
      if (intersects.length > 0) {
        this.that.zoomedObject = this.canary.getClosestObjectWithName(intersects, `showRoomImage`);
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(1920 / HOME_IMAGE_SIZE_LARGER, 1080 / HOME_IMAGE_SIZE_LARGER, this.that.zoomedObject.object.scale.z);
        }
      } else {
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(1920 / HOME_IMAGE_SIZE, 1080 / HOME_IMAGE_SIZE, this.that.zoomedObject.object.scale.z);
          this.that.zoomedObject = undefined;
        }
      }
    }
  };

  handleMouseScroll = e => {
    if (this.that.closeUpObject === undefined) {
      if (this.that.camera.position.z <= WORLD_POSITION.images || e.deltaY > 0) {
        if (this.that.camera.position.z > WORLD_POSITION.images - 2150 || e.deltaY < 0) {
          this.that.cameraRubberBanding.position.z -= e.deltaY / 3;
        }
      }
      this.that.scene.children.forEach(child => {
        if (this.that.camera.position.z <= WORLD_POSITION.images || e.deltaY > 0) {
          if (this.that.camera.position.z > WORLD_POSITION.images - 2150) {
            child.position.x += (Math.sign(child.position.x) * e.deltaY) / 30;
          }
        }
        //if(Math.abs(child.rotation.x) < SHOWROOM_MAX_X_ROTATION && Math.abs(child.rotation.y) < SHOWROOM_MAX_Y_ROTATION && Math.abs(child.rotation.z) < SHOWROOM_MAX_Z_ROTATION)
        //child.lookAt(this.that.camera.position.x, this.that.camera.position.y, this.that.camera.position.z);
        // if(Math.abs(child.rotation.x) > SHOWROOM_MAX_X_ROTATION){
        //   child.rotation.x = Math.sign(child.rotation.x)*SHOWROOM_MAX_X_ROTATION;
        // }
        // if(Math.abs(child.rotation.y) > SHOWROOM_MAX_Y_ROTATION){
        //   child.rotation.y = Math.sign(child.rotation.y)*SHOWROOM_MAX_Y_ROTATION;
        // }
        // if(Math.abs(child.rotation.z) > SHOWROOM_MAX_Z_ROTATION){
        //   child.rotation.z = Math.sign(child.rotation.y)*SHOWROOM_MAX_Z_ROTATION;
        // }
      });

      let afstand = -1000000000;
      let color = {};
      Object.entries(BACKGROUND_COLORS.images).forEach(backgroundColor => {
        const bc = { ...backgroundColor[1] };
        if (bc.position < this.that.camera.position.z && bc.position > afstand) {
          afstand = bc.position;
          color = bc;
        }
      });
      this.that.newColor = {
        r: color.r,
        g: color.g,
        b: color.b
      };
    }
  };

  animate = () => {
    const z = this.that.camera.position.z - 100;
    this.that.camera.lookAt(this.that.lookPosition.x, this.that.lookPosition.y, z);
    console.log(`test`);
    if (this.that.closeUpObject !== undefined) {
      this.that.closeUpObject.object.position.set(this.that.camera.position.x, this.that.camera.position.y, this.that.camera.position.z - 100);
      this.that.closeUpObject.object.rotation.set(0, 0, 0);
      this.that.closeUpObject.object.scale.set(60, 40, this.that.closeUpObject.object.scale.z);
    }
  };
}

export default Images;
