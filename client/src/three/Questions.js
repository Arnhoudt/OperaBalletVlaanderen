import * as THREE from "three";
import { BACKGROUND_COLORS, FONTS, WORLD_POSITION, ROUTES, PLANE_DIFFERENCE, CAMERA_PLANE_DIFFERENCE, ARBITRAIRE_CONSTANTE } from "../constants";
import Canary from "./Canary";
import Images from "./Images";
let images = new Images();

class Questions {
  canary = new Canary();
  questions = [];
  answers = [];
  loaded = false;
  questionIndex = 0;
  hover = false;
  planeZ = WORLD_POSITION.questions - CAMERA_PLANE_DIFFERENCE;

  load = that => {
    this.elements = [];
    this.that = that;
    that.movementFreedom = 100;

    this.that.questionStore.findAll().then(questions => {
      this.questions = questions;
      this.loaded = true;
      this.loadQuestions();
    });

    this.question = document.createElement(`div`);
    this.question.classList.add(`question`);
    this.question.hidden = true;

    this.input = document.createElement(`input`);
    this.submit = document.createElement(`button`);

    this.question.appendChild(this.submit);
    this.question.appendChild(this.input);
    that.mount.appendChild(this.question);

    this.question.style.position = `absolute`;
    this.question.style.top = `70%`;
    this.question.style.left = `50%`;

    this.input.classList.add(`question_input`);
    this.input.style.transform = `translate(` + -this.input.offsetWidth / 2 + `px, ` + 0 + `px) scale(4, 4)`;
    this.input.style.position = `relative`;

    this.submit.innerText = `submit`;
    this.submit.classList.add(`submit`);
    this.submit.style.transform = `translate(` + this.submit.offsetWidth / 2 + `px, ` + window.innerHeight / 10 + `px) scale(4, 4)`;
    this.submit.style.position = `relative`;

    this.loadStart();
    this.loadTerugScherm();

    window.addEventListener(`keydown`, this.handleKeyDown);
    window.addEventListener(`click`, this.handleMouseClick);
    window.addEventListener(`mousemove`, this.onMouseMove);
  };

  unmount = () => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
  };

  loadStart = () => {
    this.canary.createText(this.that, `Ontdek`, FONTS.domaineDispSemibold, 19, 0x000000, -106, 61, this.planeZ, 2);
    this.canary.createText(this.that, `wie jij bent!`, FONTS.domaineDispSemibold, 19, 0x000000, -93, 32, this.planeZ, 2);
    this.canary.createText(this.that, `Admin login`, FONTS.radikalLight, 3.6, 0x000000, 198, 73, this.planeZ, 3, Math.PI / 2, `admin`);
    this.canary.createText(this.that, `Dit is een verwezelijking van Opera Ballet Vlaanderen.`, FONTS.radikalLight, 3.6, 0x000000, 60, -110, this.planeZ, 3);
    this.canary.createPng(this.that, `assets/img/logo.png`, -18, -48, this.planeZ, 512 / 8, 218 / 8, 1, 16);
    this.canary.createPng(this.that, `assets/img/ontdek_wie_jij_bent_intro_1.png`, -103, -19, this.planeZ, 576 / 8, 119 / 8, 3, 16);
    this.canary.createPng(this.that, `assets/img/ontdek_wie_jij_bent_intro_2.png`, 50, 12, this.planeZ, 664 / 8, 78 / 8, 3, 16);
    this.canary.createPng(this.that, `assets/img/rectangle.png`, 123, -54, this.planeZ, 440 / 8, 387 / 8, 2, 16);
    this.canary.createPng(this.that, `assets/img/ontdek_wie_jij_bent_button.png`, -19, -56, this.planeZ, 432 / 8, 96 / 8, 2, 16, `start`);
    this.canary.createPng(this.that, `assets/img/a_START-1.png`, 0, 0, this.planeZ, 1920 / 8, 1080 / 8, 4, 16);
  };

  loadTerugScherm = () => {
    this.canary.createPng(this.that, `assets/img/stoppen.png`, 0, 60 - 1000, WORLD_POSITION.questions - 300, 682 / 5.2, 96 / 4, 16);
    this.canary.createPng(this.that, `assets/img/terug_scherm_intro.png`, 0, 20 - 1000, WORLD_POSITION.questions - 330, 1154 / 5.1, 107 / 6, 16);
    this.canary.createPng(this.that, `assets/img/ja.png`, -60, -50 - 1000, WORLD_POSITION.questions - 300, 288 / 5, 96 / 5, 16, `terug`);
    this.canary.createPng(this.that, `assets/img/neen.png`, 60, -50 - 1000, WORLD_POSITION.questions - 300, 288 / 5, 96 / 5, 16, `verder`);
    this.canary.createPng(this.that, `assets/img/--b_VRAGEN-1-popup.png`, 0, 0 - 1000, WORLD_POSITION.questions - 400, 500, 300, 16);
  };

  loadQuestions = () => {
    this.questions.forEach((question, index) => {
      const x = question.location.x;
      const y = question.location.y;
      const z = question.location.z;

      this.canary.createPng(this.that, `assets/img/b_VRAGEN-1.png`, x, y, WORLD_POSITION.questions - z - 400, 500, 300, 16);
      this.canary.createPng(this.that, `assets/img/vraag.png`, x - 30, y + 60, WORLD_POSITION.questions - z - 300, 836 / 5.2, 241 / 4, 16);
      this.canary.createPng(
        this.that,
        `assets/img/terug_naar_begin.png`,
        x - 185,
        y - 116,
        WORLD_POSITION.questions - z - 390,
        242 / 4.1,
        39 / 3.7,
        16,
        `terug_scherm`
      );
      question.answers.forEach((answer, index2) => {
        this.canary.createPng(
          this.that,
          `assets/img/ontdek_wie_jij_bent_button.png`,
          x - 19 + index2 * 100,
          y - 65,
          WORLD_POSITION.questions - z - 300,
          90,
          18,
          16,
          `${index}answer${index2}`
        );
      });
    });
  };

  //Handers

  handleMouseClick = e => {
    e.preventDefault();
    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
    let intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
    //de elementen zitten in intersects
    if (intersects.length > 0 && this.loaded) {
      intersects.forEach(intersect => {
        if (intersect.object.name === `start`) {
          this.that.cameraRubberBanding.position.set(
            this.questions[0].location.x,
            this.questions[0].location.y,
            WORLD_POSITION.questions - this.questions[0].location.z
          );
        }
        if (intersect.object.name === `terug_scherm`) {
          this.that.cameraRubberBanding.position.set(0, -1000, WORLD_POSITION.questions);
        }
        if (intersect.object.name === `terug`) {
          this.that.cameraRubberBanding.position.set(0, 0, WORLD_POSITION.questions);
        }
        if (intersect.object.name === `verder`) {
          this.that.cameraRubberBanding.position.set(
            this.questions[this.questionIndex].location.x,
            this.questions[this.questionIndex].location.y,
            WORLD_POSITION.questions - this.questions[this.questionIndex].location.z
          );
        }
        if (intersect.object.name === `admin`) {
          this.that.history.push(ROUTES.loginAdmin);
        }
      });
      this.questions.forEach((question, index) => {
        if (this.questionIndex === index) {
          question.answers.forEach((answer, index2) => {
            intersects.forEach(intersect => {
              if (intersect.object.name === `${index}answer${index2}`) {
                if (this.questions[index + 1]) {
                  this.that.cameraRubberBanding.position.set(
                    this.questions[index + 1].location.x,
                    this.questions[index + 1].location.y,
                    WORLD_POSITION.questions - this.questions[index + 1].location.z
                  );
                  const data = {
                    question: question.question,
                    answer: answer,
                    userId: this.that.uiStore.randomUser._id,
                    param1: 34,
                    param2: 50,
                    param3: 45,
                    param4: 12,
                    param5: 43
                  };
                  this.answers.push(data);
                  this.questionIndex += 1;
                } else {
                  const data = {
                    question: question.question,
                    answer: answer,
                    userId: this.that.uiStore.randomUser._id,
                    param1: 34,
                    param2: 50,
                    param3: 45,
                    param4: 12,
                    param5: 43
                  };
                  this.answers.push(data);
                  this.questionIndex = 0;
                  this.answers.forEach(async answer => {
                    await this.that.answerStore.create(answer);
                  });

                  this.unmount();
                  images.load(this.that);
                  this.that.cameraRubberBanding.position.set(0, 0, WORLD_POSITION.images);
                }
              }
            });
          });
        }
      });
    }
  };

  handleKeyDown = e => {
    console.log(`I have no idea why you pressed ` + e.key + ` but you did`);
  };

  onMouseMove = e => {
    e.preventDefault();
    //this.that.mouseMoved = true;
    this.that.mousePosition = {
      x: e.clientX,
      y: e.clientY
    };

    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
    let intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
    //de elementen zitten in intersects
    let objects = intersects.filter(intersect => intersect.object.name === `start`);
    if (objects.length > 0 && !this.hover) {
      objects[0].object.scale.x = 1.1;
      objects[0].object.scale.y = 1.1;
      this.hover = true;
    } else if (objects.length === 0 && this.hover) {
      let objects = this.that.scene.children.filter(child => child.name === `start`);
      objects.forEach(object => {
        object.scale.x = 1;
        object.scale.y = 1;
      });
      this.hover = false;
    }
  };

  animate = () => {
    this.question.style.transform =
      `perspective(1000px) translate(` +
      -this.that.lookPosition.x * 10 +
      `px, ` +
      this.that.lookPosition.y * 10 +
      `px)
         rotateX(` +
      this.that.lookPosition.y +
      `deg) rotateY(` +
      this.that.lookPosition.x +
      `deg)`;
  };
}

export default Questions;
