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

    window.addEventListener(`mousemove`, this.onMouseMove);
    window.addEventListener(`wheel`, this.handleMouseScroll);
    window.addEventListener(`click`, this.handleMouseClick);
    const color = that.currentColor.b + that.currentColor.g * 256 + that.currentColor.r * 256 * 256;
    let near = 300;
    let far = 1600;
    that.scene.fog = new THREE.Fog(color, near, far);

    //CREATE IMAGES
    this.createScene1();
    this.createScene2();
    this.createScene3();
    this.createScene4();
    this.createScene5();
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
        this.canary.changePointer(this.that.pointer, `assets/img/mouse_exit.png`);
        intersects.reverse();
        intersects.forEach(intersect => {
          if(intersect.object.name.split(`_`)[0] === `showRoomImage`){
            this.that.closeUpObject = intersect;
          }
        })
        // de waarden van de huidige foto worden opgeslagen TODO: dit kan efficienter
        this.that.closeUpData = this.canary.getPhotoData(this.that.closeUpObject);
        //de foto wordt centraal op het scherm van de user geplaatst
        this.that.closeUpObject.object.rotation.set(0, 0, 0);
        this.that.fog.near = 400;
        this.that.fog.far = 800;
      } else {
        this.canary.changePointer(this.that.pointer, `assets/img/whiteCircle.png`);
        this.canary.loadPhotoData(this.that.closeUpData, this.that.closeUpObject);
        this.that.fog.near = 1200;
        this.that.fog.far = 1600;
        this.that.scene.children.forEach(child => {
          if(child.name.split(`_`)[0] === `sceneElement` && child.name.split(`_`)[1] === this.that.closeUpObject.object.name.split(`_`)[1]){
            this.updateShowRoomChild(child);
          }
        })
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
      let intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
      if (intersects.length > 0) {
        this.that.zoomedObject = this.canary.getClosestObjectWithName(intersects, `showRoomImage`);
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(1.1, 1.1, this.that.zoomedObject.object.scale.z);
        }
      } else {
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(1, 1, this.that.zoomedObject.object.scale.z);
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
        if ((this.that.camera.position.z <= WORLD_POSITION.images || e.deltaY > 0) && child.name && child.name.split(`_`)[0] === `showRoomImage`) {
          if (this.that.camera.position.z > WORLD_POSITION.images - 2150) {
            child.position.x +=  (child.position.x * e.deltaY / 3000);
          }
        }else if(child.name.split(`_`)[0] === `sceneElement`){
          this.updateShowRoomChild(child);
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
    if (this.that.closeUpObject !== undefined) {
      this.that.closeUpObject.object.position.set(this.that.camera.position.x, this.that.camera.position.y, this.that.camera.position.z - 500);
      this.that.closeUpObject.object.scale.set(1, 1, 1);
      this.that.closeUpObject.object.rotation.set(0, 0, 0);
      this.that.scene.children.forEach(child => {
        if(child.name.split(`_`)[0] === `sceneElement` && child.name.split(`_`)[1] === this.that.closeUpObject.object.name.split(`_`)[1]){
          this.updateShowRoomChild(child);
        }
      })
    }
  };

  createScene1 = () => {
    this.canary.createText(this.that, `0%`, FONTS.domaineRegular, 10, 0x000000, 225, 80, WORLD_POSITION.images - 800, 1,0,`sceneElement_1_3_-25_-70`);
    this.canary.createText(this.that, `50%`, FONTS.domaineRegular, 10, 0x000000, 250, 185, WORLD_POSITION.images - 800, 1,0,`sceneElement_1_3_0_35`);
    this.canary.createText(this.that, `101%`, FONTS.domaineRegular, 20, 0x000000, 120, 140, WORLD_POSITION.images - 800, 1,0,`sceneElement_1_3_-130_-10`);
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_1_layer3.png`,
        250, 150, WORLD_POSITION.images - 800, 1920 / 5, 1080 / 5, 1, 1, `sceneElement_1_2_0_0`);
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_1_layer2.png`,
        250, 150, WORLD_POSITION.images - 800, 1920 / 5, 1080 / 5, 2, 1, `sceneElement_1_1_0_0`);
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_1_layer1.png`,
        250, 150, WORLD_POSITION.images - 800, 1920 / 5, 1080 / 5, 3, 1, `showRoomImage_1`);
  }
  createScene2 = () => {
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_2.png`,
        -200, -100, WORLD_POSITION.images - 1200, 1920 / 5, 1080 / 5, 1, 1, `showRoomImage_2`);
  }
  createScene3 = () => {
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_3.png`,
        130, 0, WORLD_POSITION.images - 1600, 1920 / 5, 1080 / 5, 1, 1, `showRoomImage_3`);
    }
  createScene4 = () => {
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_4.png`,
        -80, 200, WORLD_POSITION.images - 2000, 1920 / 5, 1080 / 5, 1, 1, `showRoomImage_4`);
   }
  createScene5 = () => {
    this.canary.createPng( this.that, `assets/img/c1_KARAKTER_5.png`,
        0, 0, WORLD_POSITION.images - 2500, 1920 / 5, 1080 / 5, 1, 1, `showRoomImage_5`);
  }

  updateShowRoomChild = (element) => {
    this.that.scene.children.forEach(child => {
      if (child.name.split(`_`)[0] === `showRoomImage`) {
        if(child.name.split(`_`)[1] === element.name.split(`_`)[1]){
          element.position.set(child.position.x + parseInt(element.name.split(`_`)[3]),
              child.position.y + parseInt(element.name.split(`_`)[4]), child.position.z + parseInt(element.name.split(`_`)[2])*10);
        }

      }
    });
  }
}

export default Images;
