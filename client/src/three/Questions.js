import * as THREE from "three";
import * as SVGLoader from "three-svg-loader";
import {BACKGROUND_COLORS, FONTS, WORLD_POSITION} from "../constants";
import Canary from "./Canary";


class Questions {
  canary = new Canary();
  load = (that) => {
    this.elements = [];
    this.that = that;
    that.movementFreedom = 100;

    window.addEventListener(`mousemove`, this.onMouseMove);
    //window.addEventListener(`wheel`, this.handleMouseScroll);
    window.addEventListener(`keydown`, this.handleKeyDown);
    window.addEventListener(`click`, this.handleMouseClick);

    this.question = document.createElement(`div`);
    this.question.classList.add(`question`);
    this.question.hidden = true;

    this.input = document.createElement(`input`);
    this.submit = document.createElement(`button`);

    this.question.appendChild(this.submit);
    this.question.appendChild(this.input);;
    that.mount.appendChild(this.question);

    this.question.style.position = `absolute`;
    this.question.style.top = `70%`;
    this.question.style.left = `50%`;

    this.input.classList.add(`question_input`);
    this.input.style.transform = `translate(` + - this.input.offsetWidth/2 + `px, ` + 0 + `px) scale(4, 4)`;
    this.input.style.position = `relative`;

    this.submit.innerText = `submit`;
    this.submit.classList.add(`submit`);
    this.submit.style.transform = `translate(` + this.submit.offsetWidth/2  + `px, ` + window.innerHeight / 10 + `px) scale(4, 4)`;
    this.submit.style.position = `relative`;


    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent.png`, -30, 60, WORLD_POSITION.questions - 300, 836/5.2, 241/4);
    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_blauwe_rechthoek.png`, -130, -10, WORLD_POSITION.questions - 390, 721/4.1, 840/3.7);
    this.canary.createPng(that, `assets/img/logo.png`, -18, -57, WORLD_POSITION.questions - 250, 440/5.2, 194/5.2);
    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_intro_1.png`, -102, -19, WORLD_POSITION.questions - 330, 576/5.1, 119/6);
    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_intro_2.png`, 42, 16, WORLD_POSITION.questions - 330, 576/5.1, 62/6);
    this.canary.createPng(that, `assets/img/pikachu.jpg`, 124, -50, WORLD_POSITION.questions - 330, 576/6, 576/6);
    this.elements.push(this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_button.png`, -19, -65, WORLD_POSITION.questions - 300, 90, 18));
    this.elements.push(this.canary.createPng(that, `assets/img/a_START-1.png`, 0, 0, WORLD_POSITION.questions - 400, 500, 300));
    //this.canary.createText(that, FONTS.helvetacaLight, 0xff6690, `Pikachu`, 0, 30, WORLD_POSITION.questions - 300, 50);
  }

  unmount = (window) => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
  }
  //Handers

  handleMouseClick = e => {
    e.preventDefault();

    this.that.newCameraPosition = {
      x:0,
      y:0,
      z:51000
    }

    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
    var intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
    //de elementen zitten in intersects
    if (intersects.length > 0) {

    }
  };

  handleKeyDown = e => {
    console.log(`I have no idea why you pressed ` + e.key + ` but you did`);
  };

  onMouseMove = event => {
    event.preventDefault();
    this.that.mouseMoved = true;
    this.that.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  };

  handleMouseScroll = e => {

  };
  animate = () =>{
    this.question.style.transform = `perspective(1000px) translate(` + -this.that.lookPosition.x*10 + `px, ` + this.that.lookPosition.y*10 + `px)
         rotateX(`+this.that.lookPosition.y+`deg) rotateY(`+this.that.lookPosition.x+`deg)`;
  }
}

export default Questions;
