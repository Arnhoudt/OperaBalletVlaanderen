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
    this.that.cameraRubberBandingForce = 0.03;
    that.movementFreedom = 1200;
    that.cameraRubberBandingActive = true;
    that.camera.position.y = 400;

    this.that.questionStore.findAll().then(questions => {
      this.questions = questions;
      this.loaded = true;
      this.loadQuestions();
    });

    this.loadStart();
    this.loadTerugScherm();
    this.loadStartQuestions();

    window.addEventListener(`keydown`, this.handleKeyDown);
    window.addEventListener(`click`, this.handleMouseClick);
    window.addEventListener(`mousemove`, this.onMouseMove);
  };

  unmount = () => {
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
    this.that.cameraRubberBandingActive = false;
  };

  loadStart = () => {
    this.canary.createText(this.that, `Ontdek`, FONTS.domaineDispSemibold, 19, 0x000000, -106, 61, this.planeZ, 2);
    this.canary.createText(this.that, `wie jij bent!`, FONTS.domaineDispSemibold, 19, 0x000000, -93, 32, this.planeZ, 2);
    this.canary.createText(this.that, `Dit is een verwezelijking van Opera Ballet Vlaanderen.`, FONTS.radikalLight, 3.6, 0x000000, 60, -110, this.planeZ, 3);
    this.canary.createText(this.that, `Er zijn verschillende`, FONTS.radikalLight, 4.2, 0x000000, -16, 14, this.planeZ, 3);
    this.canary.createText(this.that, `karakters in de opera en ballet`, FONTS.radikalLight, 4.2, 0x000000, -16, 4, this.planeZ, 3);
    this.canary.createText(this.that, `wereld maar welk karakter ben`, FONTS.radikalLight, 4.2, 0x000000, -16, -6, this.planeZ, 3);
    this.canary.createText(this.that, `jij? Kom het nu te weten`, FONTS.radikalLight, 4.2, 0x000000, -16, -16, this.planeZ, 3);
    this.canary.createText(this.that, `Jouw karakter live aan het werk zien`, FONTS.radikalMedium, 4.2, 0x000000, -160, -18, this.planeZ, 3);
    this.canary.createText(this.that, `in een`, FONTS.radikalLight, 4.2, 0x000000, -60, -18, this.planeZ, 3);
    this.canary.createText(this.that, `opera of ballet voorstelling? Dat kan!`, FONTS.radikalLight, 4.2, 0x000000, -141, -28, this.planeZ, 3);
    this.canary.createText(this.that, `Wij helpen je een`, FONTS.radikalLight, 4.2, 0x000000, -152, -38, this.planeZ, 3);
    this.canary.createText(this.that, `gratis ticket`, FONTS.radikalMedium, 4.2, 0x000000, -106, -38, this.planeZ, 3);
    this.canary.createText(this.that, `te winnen!`, FONTS.radikalLight, 4.2, 0x000000, -72, -38, this.planeZ, 3);
    this.canary.createText(this.that, `ONTDEK WIE JE BENT`, FONTS.radikalMedium, 3.2, 0xf9f9f9, -36, -48, this.planeZ, 1);
    this.canary.createText(this.that, `>`, FONTS.radikalLight, 6, 0xf9f9f9, 14, -49, this.planeZ, 1);

    this.canary.createPng(this.that, `assets/img/logo.png`, -14, -48, this.planeZ, 512 / 8, 218 / 8, 1, 1);
    this.canary.createPng(this.that, `assets/img/img_start.png`, 116, -20, this.planeZ, 444 / 8, 644 / 8, 2, 1);
    this.canary.createRectangle(this.that, -10, -46.5, WORLD_POSITION.questions - 251, 432 / 6.6, 96 / 6.6, 0, 0xe63b44, `start`);
    this.canary.createPng(this.that, `assets/img/a_START-1.png`, 0, 0, this.planeZ, 1920 / 8, 1080 / 8, 4, 1);
  };

  loadStartQuestions = () => {
    this.canary.createText(this.that, `Wat geweldig`, FONTS.domaineDispSemibold, 14, 0x000000, -106, 61 - 400, this.planeZ - 300, 2);
    this.canary.createText(this.that, `dat je jouw verhaal`, FONTS.domaineDispSemibold, 14, 0x000000, -88, 36 - 400, this.planeZ - 300, 2);
    this.canary.createText(this.that, `wilt delen!`, FONTS.domaineDispSemibold, 14, 0x000000, -96, 11 - 400, this.planeZ - 300, 2);

    this.canary.createText(this.that, `Terug naar beginscherm`, FONTS.radikalLight, 3.2, 0x000000, -158, -400 - 80, this.planeZ - 300, 2);
    this.canary.createRectangle(this.that, -134, -400 - 82, this.planeZ - 300, 242 / 5, 1 / 5, 2, 0x000000);
    this.canary.createPng(this.that, `assets/img/transparant.png`, -158, -400 - 92, this.planeZ - 300, 268 / 8, 62 / 8, 3, 1, `terug_scherm`);

    this.canary.createText(this.that, `Voel je je eerder een:`, FONTS.domaineRegular, 6, 0x000000, -58, -400 - 26, this.planeZ - 300, 2);
    this.canary.createRectangle(this.that, -50, -400 - 40, WORLD_POSITION.questions - 300 - 251, 432 / 8, 96 / 8, 0, 0x000000, `start_questions_Jos`);
    this.canary.createText(this.that, `Jos`, FONTS.radikalMedium, 3.2, 0xf9f9f9, -52, -400 - 41.5, this.planeZ - 300, 1);
    this.canary.createRectangle(this.that, 20, -400 - 40, WORLD_POSITION.questions - 300 - 251, 432 / 8, 96 / 8, 0, 0x000000, `start_questions_Marianne`);
    this.canary.createText(this.that, `Marianne`, FONTS.radikalMedium, 3.2, 0xf9f9f9, 8, -400 - 41.5, this.planeZ - 300, 1);

    this.canary.createPng(this.that, `assets/img/b_START.png`, 0, -400, this.planeZ - 300, 1920 / 8, 1080 / 8, 4, 1);
    this.canary.createRectangle(this.that, 105, -400 - 62.5, WORLD_POSITION.questions - 300 - 251, 432 / 8, 96 / 8, 0, 0x000000, `start_questions`);
    this.canary.createText(this.that, `VOLGENDE VRAAG`, FONTS.radikalMedium, 3.2, 0xf9f9f9, 84, -400 - 64, this.planeZ - 300, 1);
  };

  loadTerugScherm = () => {
    this.canary.createPng(this.that, `assets/img/stoppen.png`, 0, 60 - 1000, this.planeZ, 682 / 8, 96 / 8, 3, 16);
    this.canary.createPng(this.that, `assets/img/terug_scherm_intro.png`, 0, 20 - 1000, this.planeZ, 1154 / 8, 107 / 8, 3, 16);
    this.canary.createPng(this.that, `assets/img/ja.png`, -60, -50 - 1000, this.planeZ, 288 / 8, 96 / 8, 2, 16, `terug`);
    this.canary.createPng(this.that, `assets/img/neen.png`, 60, -50 - 1000, this.planeZ, 288 / 8, 96 / 8, 2, 16, `verder`);
    this.canary.createPng(this.that, `assets/img/--b_VRAGEN-1-popup.png`, 0, 0 - 1000, this.planeZ, 1920 / 8, 1080 / 8, 4, 16);
  };

  loadQuestions = () => {
    this.questions.forEach((question, index) => {
      const x = question.location.x;
      const y = question.location.y;
      const z = question.location.z;

      this.canary.createPng(this.that, `assets/img/b_VRAGEN-1.png`, x, y, this.planeZ - z, 1920 / 8, 1080 / 8, 4, 1);
      this.canary.createText(this.that, `Vraag:`, FONTS.domaineDispSemibold, 19, 0x000000, x - 126, y + 61, this.planeZ - z, 2);
      this.canary.createText(this.that, `Terug naar beginscherm`, FONTS.radikalLight, 3.2, 0x000000, x - 158, y - 80, this.planeZ - z, 2);
      this.canary.createRectangle(this.that, x - 134, y - 82, this.planeZ - z, 242 / 5, 1 / 5, 2, 0x000000);
      this.canary.createPng(this.that, `assets/img/transparant.png`, x - 158, y - 92, this.planeZ - z, 268 / 8, 62 / 8, 3, 1, `terug_scherm`);
      this.canary.createRectangle(this.that, x + 105, y - 62.5, WORLD_POSITION.questions - z - 251, 432 / 8, 96 / 8, 0, 0x000000, `volgende_vraag`);
      this.canary.createText(this.that, `VOLGENDE VRAAG`, FONTS.radikalMedium, 3.2, 0xf9f9f9, x + 84, y - 64, this.planeZ - z, 1);

      question.answers.forEach((answer, index2) => {
        this.canary.createPng(
          this.that,
          `assets/img/ontdek_wie_jij_bent_button.png`,
          x - 19 + index2 * 100,
          y - 65,
          this.planeZ - z,
          90,
          18,
          2,
          16,
          `${index}answer${index2}`
        );
        this.canary.createText(this.that, `${question.question}`, FONTS.domaineRegular, 7, 0x000000, x - 106, y + 40, this.planeZ - z, 2);
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
    if (intersects.length > 0 && this.loaded && !this.that.popupActive) {
      intersects.forEach(intersect => {
        if (intersect.object.name === `start`) {
          this.that.cameraRubberBanding.position.set(0, -400, WORLD_POSITION.questions - 300);
        }
        if (intersect.object.name === `start_questions_Jos`) {
          this.that.cameraRubberBanding.position.set(
            this.questions[0].location.x,
            this.questions[0].location.y,
            WORLD_POSITION.questions - this.questions[0].location.z
          );
          const data = {
            question: `Voel je je eerder een:`,
            answer: `Jos`,
            userId: this.that.uiStore.randomUser._id,
            param1: 34,
            param2: 50,
            param3: 45,
            param4: 12,
            param5: 43
          };
          this.answers.push(data);
        }
        if (intersect.object.name === `start_questions_Marianne`) {
          this.that.cameraRubberBanding.position.set(
            this.questions[0].location.x,
            this.questions[0].location.y,
            WORLD_POSITION.questions - this.questions[0].location.z
          );
          const data = {
            question: `Voel je je eerder een:`,
            answer: `Marianne`,
            userId: this.that.uiStore.randomUser._id,
            param1: 34,
            param2: 50,
            param3: 45,
            param4: 12,
            param5: 43
          };
          this.answers.push(data);
        }
        if (intersect.object.name === `terug_scherm`) {
          this.that.popupActive = true;
          this.that.movementFreedom = 10000;
          this.that.popup.style.transform = `scale(1)`;
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
                  this.that.currentWorld = WORLD_POSITION.images;
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
    this.that.mouseMoved = true;
    this.that.mousePosition = {
      x: e.clientX,
      y: e.clientY
    };

    // //De raycaster kijkt welke objecten er in het visier van de muis liggen
    // this.that.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    // this.that.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    // this.that.raycaster.setFromCamera(this.that.mouse, this.that.camera);
    // let intersects = this.that.raycaster.intersectObjects(this.that.scene.children);
    // //de elementen zitten in intersects
    // let objects = intersects.filter(intersect => intersect.object.name === `start`);
    // if (objects.length > 0 && !this.hover) {
    //   objects[0].object.scale.x = 1.1;
    //   objects[0].object.scale.y = 1.1;
    //   this.hover = true;
    // } else if (objects.length === 0 && this.hover) {
    //   let objects = this.that.scene.children.filter(child => child.name === `start`);
    //   objects.forEach(object => {
    //     object.scale.x = 1;
    //     object.scale.y = 1;
    //   });
    //   this.hover = false;
    // }
  };

  animate = () => {
    // this.that.camera.position.set(
    //   this.that.camera.position.x + this.that.lookPosition.x / 2,
    //   this.that.camera.position.y + this.that.lookPosition.y / 2,
    //   this.that.camera.position.z
    // );
    // const z = this.that.camera.position.z - 100;
    // this.that.camera.lookAt(this.that.lookPosition.x, this.that.lookPosition.y, z);
    // this.question.style.transform =
    //   `perspective(1000px) translate(` +
    //   -this.that.lookPosition.x * 10 +
    //   `px, ` +
    //   this.that.lookPosition.y * 10 +
    //   `px)
    //        rotateX(` +
    //   this.that.lookPosition.y +
    //   `deg) rotateY(` +
    //   this.that.lookPosition.x +
    //   `deg)`;
  };
}

export default Questions;
