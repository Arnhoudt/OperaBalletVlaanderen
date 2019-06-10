import * as THREE from "three";
import { BACKGROUND_COLORS, FONTS, WORLD_POSITION, ROUTES } from "../constants";
import Canary from "./Canary";

class Questions {
  canary = new Canary();
  questions = [];
  answers = [];
  loaded = false;
  questionIndex = 0;

  load = that => {
    this.elements = [];
    this.that = that;
    that.movementFreedom = 100;

    this.that.questionStore.findAll().then(questions => {
      this.questions = questions;
      this.loaded = true;
      this.loadQuestions();
    });

    window.addEventListener(`keydown`, this.handleKeyDown);
    window.addEventListener(`click`, this.handleMouseClick);

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

    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent.png`, -30, 60, WORLD_POSITION.questions - 300, 836 / 5.2, 241 / 4, 16);
    this.canary.createPng(that, `assets/img/admin_login.png`, 230, 110, WORLD_POSITION.questions - 390, 40 / 4.1, 122 / 3.7, 16, `admin`);
    this.canary.createPng(that, `assets/img/logo.png`, -18, -57, WORLD_POSITION.questions - 250, 440 / 5.2, 194 / 5.2, 16);
    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_intro_1.png`, -103, -19, WORLD_POSITION.questions - 330, 576 / 5.1, 119 / 6, 16);
    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_intro_2.png`, 50, 12, WORLD_POSITION.questions - 330, 664 / 5.1, 78 / 6, 16);
    this.canary.createPng(that, `assets/img/rectangle.png`, 123, -54, WORLD_POSITION.questions - 330, 440 / 4.6, 387 / 4.6, 16);
    this.canary.createPng(that, `assets/img/ontdek_wie_jij_bent_button.png`, -19, -65, WORLD_POSITION.questions - 300, 90, 18, 16, `start`);
    this.canary.createPng(that, `assets/img/a_START-1.png`, 0, 0, WORLD_POSITION.questions - 400, 500, 300, 16);
    //this.canary.createText(that, FONTS.helvetacaLight, 0xff6690, `Pikachu`, 0, 30, WORLD_POSITION.questions - 300, 50);
  };

  unmount = window => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
  };

  loadQuestions = () => {
    this.questions.forEach((question, index) => {
      this.canary.createPng(
        this.that,
        `assets/img/vraag.png`,
        question.location.x - 30,
        question.location.y + 60,
        WORLD_POSITION.questions - question.location.z - 300,
        836 / 5.2,
        241 / 4,
        16
      );
      this.canary.createPng(
        this.that,
        `assets/img/terug_naar_begin.png`,
        question.location.x - 130,
        question.location.y - 10,
        WORLD_POSITION.questions - question.location.z - 390,
        242 / 4.1,
        39 / 3.7,
        16,
        `terug`
      );
      this.canary.createPng(
        this.that,
        `assets/img/b_VRAGEN-1.png`,
        question.location.x + 0,
        question.location.y + 0,
        WORLD_POSITION.questions - question.location.z - 400,
        500,
        300,
        16
      );
      question.answers.forEach((answer, index2) => {
        this.canary.createPng(
          this.that,
          `assets/img/ontdek_wie_jij_bent_button.png`,
          question.location.x - 19 + index2 * 100,
          question.location.y - 65,
          WORLD_POSITION.questions - question.location.z - 300,
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
          //window.addEventListener(`mousemove`, this.onMouseMove);
          this.that.cameraRubberBanding.position.set(
            this.questions[0].location.x,
            this.questions[0].location.y,
            WORLD_POSITION.questions - this.questions[0].location.z
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
                  this.that.cameraRubberBanding.position.set(0, 0, WORLD_POSITION.questions);
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

  onMouseMove = event => {
    event.preventDefault();
    this.that.mouseMoved = true;
    this.that.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
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
