import * as THREE from "three";
import { BACKGROUND_COLORS, FONTS, WORLD_POSITION, SCENE_Z_DIFFERENCE, FOG } from "../constants";
import Canary from "./Canary";
import {log} from "three";

class Showroom {
  canary = new Canary();
  setThis = that => {
    this.that = that;
  };

  load = async that => {
    //console.log(that.answers);
    this.answers = await that.answerStore.findAllByUser(that.uiStore.randomUser._id);
    this.char1 = 0;
    this.char2 = 0;
    this.char3 = 0;

    this.answers.forEach(answer => {
      this.char1 += answer.param1;
      this.char2 += answer.param2;
      this.char3 += answer.param3;
    })

    console.log(this.char1);

    this.that = that;
    this.that.iconscroll.style.opacity = 1;

    this.that.cameraRubberBandingForce = 1;
    that.movementFreedom = 500;
    that.cameraRubberBandingActive = true;
    this.that.fog = { near: FOG.near, far: FOG.far };
    //eventlisteners
    window.addEventListener(`mousemove`, this.onMouseMove);
    window.addEventListener(`wheel`, this.handleMouseScroll);
    window.addEventListener(`mouseup`, this.handleMouseClick);
    const color = that.currentColor.b + that.currentColor.g * 256 + that.currentColor.r * 256 * 256;
    let near = 300;
    let far = 1600;
    that.scene.fog = new THREE.Fog(color, near, far);
    //CREATE IMAGES
    let numberChar
    if(this.char1 > this.char2){
      if(this.char3> this.char1){
        numberChar = 3
      }else{
        numberChar = 1
      }
    }else if(this.char3 > this.char2){
      numberChar = 3
    }else{
      numberChar = 2
    }
    this.createScene1(numberChar);
    this.createScene2(numberChar);
    this.createScene3();
    this.createScene4(numberChar);
    this.createScene5();
  };
  unmount = () => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`mouseup`, this.handleMouseClick);
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
          if (intersect.object.name.split(`_`)[0] === `showRoomImage`) {
            this.that.closeUpObject = intersect;
          }
        });
        // de waarden van de huidige foto worden opgeslagen TODO: dit kan efficienter
        this.that.closeUpData = this.canary.getPhotoData(this.that.closeUpObject);
        //de foto wordt centraal op het scherm van de user geplaatst
        this.that.closeUpObject.object.rotation.set(0, 0, 0);
        this.that.fog.near = 300;
        this.that.fog.far = 400;
      } else {
        this.canary.changePointer(this.that.pointer, `assets/img/mouse_pointer.png`);
        this.canary.loadPhotoData(this.that.closeUpData, this.that.closeUpObject);
        this.that.fog.near = 1200;
        this.that.fog.far = 1600;
        this.that.scene.children.forEach(child => {
          if (child.name.split(`_`)[0] === `sceneElement` && child.name.split(`_`)[1] === this.that.closeUpObject.object.name.split(`_`)[1]) {
            this.updateShowRoomChild(child);
          }
        });
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
        if(this.that.pointerName !== `view`){
          this.canary.changePointer(this.that.pointer, `assets/img/mouse_view.png`);
          this.that.pointerName = `view`;
        }
        this.that.zoomedObject = this.canary.getClosestObjectWithName(intersects, `showRoomImage`);
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(1.1, 1.1, this.that.zoomedObject.object.scale.z);
        }
      } else {
        if(this.that.pointerName !== `arrow`){
          this.canary.changePointer(this.that.pointer, `assets/img/mouse_pointer.png`);
          this.that.pointerName = `arrow`;
        }
        if (this.that.zoomedObject) {
          this.that.zoomedObject.object.scale.set(1, 1, this.that.zoomedObject.object.scale.z);
          this.that.zoomedObject = undefined;
        }
      }
    }
  };
  handleMouseScroll = e => {
    this.that.iconscroll.style.opacity -=  Math.abs(e.deltaY)/1000;
    if (this.that.closeUpObject === undefined) {
      if (this.that.camera.position.z <= WORLD_POSITION.images || e.deltaY > 0) {
        if (this.that.camera.position.z > WORLD_POSITION.images - 2150 || e.deltaY < 0) {
          this.that.cameraRubberBanding.position.z -= e.deltaY / 3;
        }
      }
      this.that.scene.children.forEach(child => {
        if ((this.that.camera.position.z <= WORLD_POSITION.images || e.deltaY > 0) && child.name && child.name.split(`_`)[0] === `showRoomImage`) {
          if (this.that.camera.position.z > WORLD_POSITION.images - 2150) {
            child.position.x += (child.position.x * e.deltaY) / 3000;
          }
        } else if (child.name && child.name.split(`_`)[0] === `sceneElement`) {
          this.updateShowRoomChild(child);
        }
        //if(Math.abs(child.rotation.x) < SHOWROOM_MAX_X_ROTATION && Math.abs(child.rotation.y) < SHOWROOM_MAX_Y_ROTATION && Math.abs(child.rotation.z)
        //< SHOWROOM_MAX_Z_ROTATION)
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
      this.that.closeUpObject.object.position.set(this.that.camera.position.x, this.that.camera.position.y, this.that.camera.position.z - 300);
      this.that.closeUpObject.object.scale.set(1, 1, 1);
      this.that.closeUpObject.object.rotation.set(0, 0, 0);
      this.that.scene.children.forEach(child => {
        if (child.name && child.name.split(`_`)[0] === `sceneElement` && child.name.split(`_`)[1] === this.that.closeUpObject.object.name.split(`_`)[1]) {
          this.updateShowRoomChild(child);
        }
      });
    }
  };
  createScene1 = (number) => {
    this.canary.createText(this.that, (this.char1/this.answers.length*10)+`%`, FONTS.domaineRegular, 7, 0x000000, 230, 94, WORLD_POSITION.images - 780, 0, 0, `sceneElement_1_2_-20_-56`);
    this.canary.createText(this.that, (this.char2/this.answers.length*10)+`%`, FONTS.domaineRegular, 7, 0x000000, 250, 178, WORLD_POSITION.images - 780, 0, 0, `sceneElement_1_2_0_28`);
    this.canary.createText(this.that, (this.char3/this.answers.length*10)+`%`, FONTS.domaineDispSemibold, 14, 0x000000, 150, 140, WORLD_POSITION.images - 780, 0, 0, `sceneElement_1_2_-100_-10`);
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_1_layer3.png`,
      250,
      150,
      WORLD_POSITION.images - 780,
      1920 / 5,
      1080 / 5,
      0,
      16,
      false,
      `sceneElement_1_2_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_1_layer2.png`,
      250,
      150,
      WORLD_POSITION.images - 790,
      1920 / 5,
      1080 / 5,
      0,
      1,
      true,
      `sceneElement_1_1_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_1_layer1.png`,
      250,
      150,
      WORLD_POSITION.images - 800,
      1920 / 5,
      1080 / 5,
      0,
      1,
      true,
      `showRoomImage_1`
    );
  };
  createScene2 = (number) => {
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_2_layer2.png`,
      -200,
      -100,
      WORLD_POSITION.images - 1190,
      1920 / 5.2,
      1080 / 5.2,
      0,
      1,
      true,
      `sceneElement_2_1_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_2_layer3.png`,
      -200,
      -100,
      WORLD_POSITION.images - 1190,
      1920 / 5.2,
      1080 / 5.2,
      0,
      16,
      false,
      `sceneElement_2_2_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_2_layer1.png`,
      -200,
      -100,
      WORLD_POSITION.images - 1200,
      1920 / 5,
      1080 / 5,
      0,
      1,
      true,
      `showRoomImage_2`
    );
  };
  createScene3 = () => {
    this.canary.createPng(
      this.that,
      `assets/img/c1_KARAKTER_3_layer2.png`,
      130,
      0,
      WORLD_POSITION.images - 1580,
      1920 / 5.2,
      1080 / 5.2,
      0,
      1,
      true,
      `sceneElement_3_1_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c1_KARAKTER_3_layer3.png`,
      130,
      0,
      WORLD_POSITION.images - 1590,
      1920 / 5.2,
      1080 / 5.2,
      0,
      16,
      false,
      `sceneElement_3_1_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c1_KARAKTER_3_layer1.png`,
      130,
      0,
      WORLD_POSITION.images - 1600,
      1920 / 5,
      1080 / 5,
      0,
      1,
      true,
      `showRoomImage_3`
    );
  };
  createScene4 = (number) => {
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_4_layer2.png`,
      -80,
      200,
      WORLD_POSITION.images - 1990,
      1920 / 5.2,
      1080 / 5.2,
      0,
      1,
      true,
      `sceneElement_4_1_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_4_layer3.png`,
      -80,
      200,
      WORLD_POSITION.images - 1980,
      1920 / 5.2,
      1080 / 5.2,
      0,
      16,
      false,
      `sceneElement_4_2_0_0`
    );
    this.canary.createPng(
      this.that,
      `assets/img/c`+number+`_KARAKTER_4_layer1.png`,
      -80,
      200,
      WORLD_POSITION.images - 2000,
      1920 / 5,
      1080 / 5,
      0,
      1,
      true,
      `showRoomImage_4`
    );
  };
  createScene5 = () => {
    this.canary.createPng(this.that, `assets/img/c1_KARAKTER_5.png`, 0, 0, WORLD_POSITION.images - 2500, 1920 / 5, 1080 / 5, 0, 1, true, `showRoomImage_5`);
  };
  updateShowRoomChild = element => {
    this.that.scene.children.forEach(child => {
      if (child.name && child.name.split(`_`)[0] === `showRoomImage`) {
        if (child.name.split(`_`)[1] === element.name.split(`_`)[1]) {
          element.position.set(
            child.position.x + parseInt(element.name.split(`_`)[3]),
            child.position.y + parseInt(element.name.split(`_`)[4]),
            child.position.z + parseInt(element.name.split(`_`)[2]) * SCENE_Z_DIFFERENCE
          );
        }
      }
    });
  };
}
export default Showroom;
