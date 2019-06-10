import * as THREE from "three";
import { BACKGROUND_COLORS, FONTS, WORLD_POSITION } from "../constants";
import Canary from "./Canary";

class Images {
  canary = new Canary();
  load = that => {
    this.that = that;
    that.movementFreedom = 20;
    //CREATE IMAGES
    this.canary.createImage(that, `assets/img/pikachu.jpg`, 200, 100, WORLD_POSITION.images - 1800, 200, 150, `showRoomImage`);
    this.canary.createImage(that, `assets/img/pikachu.jpg`, -200, -100, WORLD_POSITION.images - 2000, 200, 150, `showRoomImage`);
    this.canary.createImage(that, `assets/img/pikachu.jpg`, 200, 0, WORLD_POSITION.images - 2200, 200, 150, `showRoomImage`);
    this.canary.createImage(that, `assets/img/pikachu.jpg`, -150, 100, WORLD_POSITION.images - 2300, 200, 150, `showRoomImage`);
    //CREATE TEXT
    this.canary.createHollowText(that, FONTS.helvetacaLight, 0xff6690, `Pikachu`, 0, 0, WORLD_POSITION.images - 1000, 200);
    this.canary.createHollowText(that, FONTS.helvetacaLight, 0xff6690, `Pika Pika`, 0, 0, WORLD_POSITION.images - 3300, 200);

    //eventlisteners
    window.addEventListener(`mousemove`, this.onMouseMove);
    window.addEventListener(`wheel`, this.handleMouseScroll);
    window.addEventListener(`keydown`, this.handleKeyDown);
    window.addEventListener(`click`, this.handleMouseClick);
    const color = that.currentColor.b + that.currentColor.g * 256 + that.currentColor.r * 256 * 256;
    let near = 300;
    let far = 1600;
    that.scene.fog = new THREE.Fog(color, near, far);
  };

  unmount = () => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
  };
  //Handers

  handleMouseClick = e => {
    e.preventDefault();

    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
    var intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
    //de elementen zitten in intersects

    if (intersects.length > 0) {
      //er wordt gecontroleerd of er momenteel naar een object wordt gekeken
      if (this.that.closeUpObject === undefined) {
        this.that.closeUpObject = intersects[0];
        // de waarden van de huidige foto worden opgeslagen TODO: dit kan efficienter
        this.that.closeUpData = this.canary.getPhotoData(this.that.closeUpObject);
        //de foto wordt centraal op het scherm van de user geplaatst
        this.that.closeUpObject.object.position.set(0, 0, this.that.camera.position.z - 100);
        this.that.closeUpObject.object.rotation.set(0, 0, 0);
        this.that.closeUpObject.object.scale.set(60, 40, this.that.closeUpObject.object.scale.z);
        this.that.scene.fog = new THREE.Fog(this.that.currentColor.b + this.that.currentColor.g * 256 + this.that.currentColor.r * 256 * 256, 105, 120);
      } else {
        this.canary.loadPhotoData(this.that.closeUpData, this.that.closeUpObject);
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
      this.that.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.that.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
      var intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
      if (intersects.length > 0) {
        this.that.zoomedObject = this.canary.getClosestObjectWithName(intersects, `showRoomImage`);
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(240, 170, this.that.zoomedObject.object.scale.z);
        }
      } else {
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(200, 150, this.that.zoomedObject.object.scale.z);
          this.that.zoomedObject = undefined;
        }
      }
    }
  };

  handleMouseScroll = e => {
    if (this.that.closeUpObject === undefined) {
      this.that.camera.position.z -= e.deltaY / 3;
      this.that.scene.children.forEach(child => {
        child.lookAt(this.that.camera.position.x, this.that.camera.position.y, this.that.camera.position.z);
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
    const z = this.camera.position.z - 100;
    this.camera.lookAt(this.lookPosition.x, this.lookPosition.y, z);
  };
}

export default Images;
