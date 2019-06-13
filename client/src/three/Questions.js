import * as THREE from "three";
import { FONTS, WORLD_POSITION, CAMERA_PLANE_DIFFERENCE, FOG_QUESTIONS } from "../constants";
import Canary from "./Canary";
import Images from "./Images";

class Questions {
  canary = new Canary();
  images = new Images();
  questions = [];
  loaded = false;
  questionIndex = 0;
  hover = false;
  planeZ = WORLD_POSITION.questions - CAMERA_PLANE_DIFFERENCE;
  currentAnswers = [];
  selectedAnswers = [];
  tex = null;
  texSelected = null;
  imagesUnselected = [];
  imagesSelected = [];
  soundUnselected = null;
  soundSelected = null;
  sounds = [];

  load = that => {
    this.elements = [];
    this.that = that;
    this.that.cameraRubberBandingForce = 0.03;
    that.movementFreedom = 1200;
    that.cameraRubberBandingActive = true;
    that.camera.position.y = -400;

    let loader = new THREE.TextureLoader();
    loader.load(`assets/img/button_border.png`, tex => (this.tex = tex));
    loader.load(`assets/img/button_border_selected.png`, tex => (this.texSelected = tex));
    loader.load(`assets/img/questions/aarde.png`, image => this.imagesUnselected.push({ image: `aarde`, tex: image }));
    loader.load(`assets/img/questions/collegas.png`, image => this.imagesUnselected.push({ image: `collegas`, tex: image }));
    loader.load(`assets/img/questions/familie.png`, image => this.imagesUnselected.push({ image: `familie`, tex: image }));
    loader.load(`assets/img/questions/hel.png`, image => this.imagesUnselected.push({ image: `hel`, tex: image }));
    loader.load(`assets/img/questions/hemel.png`, image => this.imagesUnselected.push({ image: `hemel`, tex: image }));
    loader.load(`assets/img/questions/India.png`, image => this.imagesUnselected.push({ image: `India`, tex: image }));
    loader.load(`assets/img/questions/Schotland.png`, image => this.imagesUnselected.push({ image: `Schotland`, tex: image }));
    loader.load(`assets/img/questions/Spanje.png`, image => this.imagesUnselected.push({ image: `Spanje`, tex: image }));
    loader.load(`assets/img/questions/vrienden.png`, image => this.imagesUnselected.push({ image: `vrienden`, tex: image }));
    loader.load(`assets/img/questions/aarde_selected.png`, image => this.imagesSelected.push({ image: `aarde`, tex: image }));
    loader.load(`assets/img/questions/collegas_selected.png`, image => this.imagesSelected.push({ image: `collegas`, tex: image }));
    loader.load(`assets/img/questions/familie_selected.png`, image => this.imagesSelected.push({ image: `familie`, tex: image }));
    loader.load(`assets/img/questions/hel_selected.png`, image => this.imagesSelected.push({ image: `hel`, tex: image }));
    loader.load(`assets/img/questions/hemel_selected.png`, image => this.imagesSelected.push({ image: `hemel`, tex: image }));
    loader.load(`assets/img/questions/India_selected.png`, image => this.imagesSelected.push({ image: `India`, tex: image }));
    loader.load(`assets/img/questions/Schotland_selected.png`, image => this.imagesSelected.push({ image: `Schotland`, tex: image }));
    loader.load(`assets/img/questions/Spanje_selected.png`, image => this.imagesSelected.push({ image: `Spanje`, tex: image }));
    loader.load(`assets/img/questions/vrienden_selected.png`, image => this.imagesSelected.push({ image: `vrienden`, tex: image }));
    loader.load(`assets/img/questions/play.png`, sound => (this.soundUnselected = sound));
    loader.load(`assets/img/questions/pauze.png`, sound => (this.soundSelected = sound));

    this.canary.createSound(this, `assets/sounds/frans_CarmenHabanera_short.mp3`);
    this.canary.createSound(this, `assets/sounds/italiaans_CarmenHabanera_short.mp3`);
    this.canary.createSound(this, `assets/sounds/russisch_CarmenHabanera_short.mp3`);

    this.that.fog = { near: FOG_QUESTIONS.near, far: FOG_QUESTIONS.far };

    this.that.questionStore.findAll().then(questions => {
      this.questions = questions;
      this.loaded = true;
      this.loadQuestions();
    });

    this.loadStart();
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
    this.canary.createText(this.that, `Er zijn`, FONTS.radikalLight, 4.2, 0x000000, -16, 14, this.planeZ, 3);
    this.canary.createText(this.that, `vele verschillende`, FONTS.radikalMedium, 4.2, 0x000000, 1, 14, this.planeZ, 3);
    this.canary.createText(this.that, `karakters`, FONTS.radikalMedium, 4.2, 0x000000, -16, 4, this.planeZ, 3);
    this.canary.createText(this.that, `in de opera en ballet`, FONTS.radikalLight, 4.2, 0x000000, 11, 4, this.planeZ, 3);
    this.canary.createText(this.that, `wereld maar welk karakter ben`, FONTS.radikalLight, 4.2, 0x000000, -16, -6, this.planeZ, 3);
    this.canary.createText(this.that, `jij?`, FONTS.radikalLight, 4.2, 0x000000, -16, -16, this.planeZ, 3);
    this.canary.createText(this.that, `Kom het nu te weten`, FONTS.radikalMedium, 4.2, 0x000000, -8, -16, this.planeZ, 3);
    this.canary.createText(this.that, `Jouw karakter live aan het werk zien`, FONTS.radikalMedium, 4.2, 0x000000, -160, -18, this.planeZ, 3);
    this.canary.createText(this.that, `in een`, FONTS.radikalLight, 4.2, 0x000000, -60, -18, this.planeZ, 3);
    this.canary.createText(this.that, `opera of ballet voorstelling? Dat kan!`, FONTS.radikalLight, 4.2, 0x000000, -141, -28, this.planeZ, 3);
    this.canary.createText(this.that, `Wij helpen je een`, FONTS.radikalLight, 4.2, 0x000000, -152, -38, this.planeZ, 3);
    this.canary.createText(this.that, `gratis ticket`, FONTS.radikalMedium, 4.2, 0x000000, -106, -38, this.planeZ, 3);
    this.canary.createText(this.that, `te winnen!`, FONTS.radikalLight, 4.2, 0x000000, -72, -38, this.planeZ, 3);
    this.canary.createText(this.that, `ONTDEK WIE JE BENT`, FONTS.radikalMedium, 3.2, 0xf9f9f9, -36, -48, this.planeZ, 1);
    this.canary.createText(this.that, `>`, FONTS.radikalLight, 6, 0xf9f9f9, 14, -49, this.planeZ, 1);

    this.canary.createPng(this.that, `assets/img/logo.png`, -14, -48, this.planeZ, 512 / 8, 218 / 8, 1, 1, true);
    this.canary.createPng(this.that, `assets/img/img_start.png`, 116, -20, this.planeZ, 444 / 8, 644 / 8, 2, 1, true);
    this.canary.createRectangle(this.that, -10, -46.5, WORLD_POSITION.questions - 251, 432 / 6.6, 96 / 6.6, 0, 0xe63b44, `start`);
    this.canary.createPng(this.that, `assets/img/a_START-1.png`, 0, 0, this.planeZ, 1920 / 8, 1080 / 8, 4, 1, true);
  };

  loadStartQuestions = () => {
    this.canary.createText(this.that, `Oké, laten we`, FONTS.domaineDispSemibold, 12, 0x000000, -117, 61 - 400, this.planeZ - 300, 2);
    this.canary.createText(this.that, `beginnen met`, FONTS.domaineDispSemibold, 12, 0x000000, -92, 39 - 400, this.planeZ - 300, 2);
    this.canary.createText(this.that, `de ontdekking ...`, FONTS.domaineDispSemibold, 12, 0x000000, -130, 17 - 400, this.planeZ - 300, 2);
    this.canary.createText(this.that, `Terug naar beginscherm`, FONTS.radikalLight, 3.2, 0x000000, -158, -400 - 80, this.planeZ - 300, 2);
    this.canary.createRectangle(this.that, -134, -400 - 82, this.planeZ - 300, 242 / 5, 1 / 5, 2, 0x000000);
    this.canary.createPng(this.that, `assets/img/transparant.png`, -158, -400 - 92, this.planeZ - 300, 268 / 8, 62 / 8, 3, 1, false, `terug_scherm`);
    this.canary.createText(this.that, `Voel je jou eerder een:`, FONTS.domaineRegular, 6, 0x000000, -58, -400 - 26, this.planeZ - 300, 2);
    this.canary.createPng(
      this.that,
      `assets/img/button_border.png`,
      -80,
      -400 - 40,
      WORLD_POSITION.questions - 300 - 251,
      288 / 6.4,
      72 / 6.4,
      0,
      1,
      false,
      `answer_${111}_${111}_Man_button`
    );
    this.canary.createPng(this.that, `assets/img/man_icon.png`, -80, -400 - 40, this.planeZ - 300, 30 / 6.6, 30 / 6.6, 1, 1, false);
    this.canary.createPng(
      this.that,
      `assets/img/button_border.png`,
      -15,
      -400 - 40,
      WORLD_POSITION.questions - 300 - 251,
      288 / 6.4,
      72 / 6.4,
      0,
      1,
      false,
      `answer_${111}_${111}_Women_button`
    );
    this.canary.createPng(this.that, `assets/img/women_icon.png`, -15, -400 - 40, this.planeZ - 300, 21 / 6.6, 34 / 6.6, 1, 1, false);
    this.canary.createPng(
      this.that,
      `assets/img/button_border.png`,
      50,
      -400 - 40,
      WORLD_POSITION.questions - 300 - 251,
      288 / 6.4,
      72 / 6.4,
      0,
      1,
      false,
      `answer_${111}_${111}_Man Women_button`
    );
    this.canary.createPng(this.that, `assets/img/man_women_icon.png`, 50, -400 - 40, this.planeZ - 300, 30 / 6.6, 42 / 6.6, 1, 1, false);
    this.canary.createPng(this.that, `assets/img/b_START.png`, 0, -400, this.planeZ - 300, 1920 / 8, 1080 / 8, 4, 1, true);
    this.canary.createRectangle(this.that, 105, -400 - 62.5, WORLD_POSITION.questions - 300 - 251, 432 / 8, 96 / 8, 0, 0x000000, `start_questions`);
    this.canary.createText(this.that, `VOLGENDE VRAAG`, FONTS.radikalMedium, 3.2, 0xf9f9f9, 84, -400 - 64, this.planeZ - 300, 1);
    this.canary.createText(
      this.that,
      `* Dit is definitief. Je kunt niet meer terugkeren.`,
      FONTS.radikalLight,
      2.8,
      0x000000,
      51,
      -74 - 400,
      this.planeZ - 300,
      1
    );
  };

  loadQuestions = () => {
    this.questions.forEach((question, index) => {
      const x = question.location.x;
      const y = question.location.y;
      const z = question.location.z;
      this.canary.createText(this.that, `${question.question}`, FONTS.domaineRegular, 7, 0x000000, x - 106, y + 40, this.planeZ - z, 2);
      this.canary.createPng(this.that, `assets/img/b_VRAGEN-1.png`, x, y, this.planeZ - z, 1920 / 8, 1080 / 8, 4, 1, true);
      this.canary.createText(this.that, `Vraag:`, FONTS.domaineDispSemibold, 19, 0x000000, x - 126, y + 61, this.planeZ - z, 2);
      this.canary.createText(this.that, `Terug naar beginscherm`, FONTS.radikalLight, 3.2, 0x000000, x - 158, y - 80, this.planeZ - z, 2);
      this.canary.createRectangle(this.that, x - 134, y - 82, this.planeZ - z, 242 / 5, 1 / 5, 2, 0x000000);
      this.canary.createPng(this.that, `assets/img/transparant.png`, x - 158, y - 92, this.planeZ - z, 268 / 8, 62 / 8, 3, 1, false, `terug_scherm`);
      this.canary.createRectangle(this.that, x + 105, y - 62.5, WORLD_POSITION.questions - z - 251, 432 / 8, 96 / 8, 0, 0x000000, `volgende_vraag`);
      this.canary.createText(this.that, `VOLGENDE VRAAG`, FONTS.radikalMedium, 3.2, 0xf9f9f9, x + 84, y - 64, this.planeZ - z, 1);
      const positionButtons = [
        { x: -80, y: 0 },
        { x: -12, y: 0 },
        { x: 56, y: 0 },
        { x: -80, y: -20 },
        { x: -12, y: -20 },
        { x: 56, y: -20 },
        { x: -80, y: -40 },
        { x: -12, y: -40 },
        { x: 56, y: -40 }
      ];
      const positionImages = [{ x: -79, y: -15 }, { x: 0, y: -15 }, { x: 79, y: -15 }];
      switch (question.type) {
        case `Button`:
          question.answers.forEach((answer, index2) => {
            this.canary.createPng(
              this.that,
              `assets/img/button_border.png`,
              x + positionButtons[index2].x,
              y + positionButtons[index2].y,
              WORLD_POSITION.questions - z - 251,
              288 / 6.4,
              72 / 6.4,
              0,
              1,
              false,
              `answer_${index}_${index2}_${answer}_button`
            );
            this.canary.createText(
              this.that,
              `${answer}`,
              FONTS.radikalLight,
              3.2,
              0x000000,
              x + positionButtons[index2].x,
              y + positionButtons[index2].y,
              this.planeZ - z,
              1,
              0,
              `textButton`,
              true
            );
          });
          break;
        case `Beeld`:
          question.answers.forEach((answer, index2) => {
            this.canary.createPng(
              this.that,
              `assets/img/questions/${answer}.png`,
              x + positionImages[index2].x,
              y + positionImages[index2].y,
              WORLD_POSITION.questions - z - 251,
              432 / 6.4,
              312 / 6.4,
              0,
              1,
              false,
              `answer_${index}_${index2}_${answer}_beeld`
            );
            this.canary.createText(
              this.that,
              `${answer}`,
              FONTS.radikalLight,
              3.2,
              0x000000,
              x + positionImages[index2].x,
              y + positionImages[index2].y - 30,
              this.planeZ - z,
              1,
              0,
              `answerText_${index}_${index2}_${answer}_beeld`,
              true
            );
          });
          break;
        case `Geluid`:
          question.answers.forEach((answer, index2) => {
            this.canary.createPng(
              this.that,
              `assets/img/questions/play.png`,
              x + positionImages[index2].x,
              y + positionImages[index2].y,
              WORLD_POSITION.questions - z - 251,
              432 / 6.4,
              312 / 6.4,
              0,
              1,
              false,
              `answer_${index}_${index2}_${answer}_geluid`
            );
            this.canary.createText(
              this.that,
              `${answer}`,
              FONTS.radikalLight,
              3.2,
              0x000000,
              x + positionImages[index2].x,
              y + positionImages[index2].y - 30,
              this.planeZ - z,
              1,
              0,
              `answerText_${index}_${index2}_${answer}_geluid`,
              true
            );
          });
          break;
        default:
          break;
      }
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
          this.that.cameraRubberBanding.position.set(0, -400, WORLD_POSITION.questions - 300);
        }
        if (intersect.object.name) {
          const a = intersect.object.name.split(`_`);
          if (a[0] === `answer`) {
            if (a[4] === `button`) {
              if (this.selectedAnswers[`${a[1]}${a[2]}`]) {
                this.currentAnswers.splice(this.currentAnswers.findIndex(answer => answer === a[3]), 1);
                intersect.object.material.map = this.tex;
                this.selectedAnswers[`${a[1]}${a[2]}`] = false;
              } else {
                this.currentAnswers.push(a[3]);
                intersect.object.material.map = this.texSelected;
                this.selectedAnswers[`${a[1]}${a[2]}`] = true;
              }
            }
            if (a[4] === `beeld`) {
              let meshText = null;
              this.that.scene.children.forEach(mesh => {
                if (mesh.name) {
                  if (mesh.name.split(`_`)[0] === `answerText`) {
                    if (mesh.name.split(`_`)[3] === a[3]) {
                      meshText = mesh;
                    }
                  }
                }
              });
              if (this.selectedAnswers[`${a[1]}${a[2]}`]) {
                this.currentAnswers.splice(this.currentAnswers.findIndex(answer => answer === a[3]), 1);
                intersect.object.material.map = this.imagesUnselected.filter(image => image.image === a[3])[0].tex;
                meshText.material.color.set(0x000000);
                this.selectedAnswers[`${a[1]}${a[2]}`] = false;
              } else {
                this.currentAnswers.push(a[3]);
                intersect.object.material.map = this.imagesSelected.filter(image => image.image === a[3])[0].tex;
                meshText.material.color.set(0xe63b44);
                this.selectedAnswers[`${a[1]}${a[2]}`] = true;
              }
            }
            if (a[4] === `geluid`) {
              let meshText = null;
              this.that.scene.children.forEach(mesh => {
                if (mesh.name) {
                  if (mesh.name.split(`_`)[0] === `answerText`) {
                    if (mesh.name.split(`_`)[3] === a[3]) {
                      meshText = mesh;
                    }
                  }
                }
              });
              if (this.selectedAnswers[`${a[1]}${a[2]}`]) {
                this.sounds[a[2]].pause();
                this.currentAnswers.splice(this.currentAnswers.findIndex(answer => answer === a[3]), 1);
                intersect.object.material.map = this.soundUnselected;
                meshText.material.color.set(0x000000);
                this.selectedAnswers[`${a[1]}${a[2]}`] = false;
              } else {
                this.sounds.forEach(sound => {
                  if (sound.isPlaying) {
                    sound.stop();
                  }
                });
                this.sounds[a[2]].play();
                this.currentAnswers.push(a[3]);
                intersect.object.material.map = this.soundSelected;
                meshText.material.color.set(0xe63b44);
                this.selectedAnswers[`${a[1]}${a[2]}`] = true;
              }
            }
          }
        }
        if (intersect.object.name === `start_questions`) {
          this.that.cameraRubberBanding.position.set(
            this.questions[this.questionIndex].location.x,
            this.questions[this.questionIndex].location.y,
            WORLD_POSITION.questions - this.questions[this.questionIndex].location.z
          );
          const data = {
            question: `Voel je je eerder een:`,
            answers: this.currentAnswers,
            userId: this.that.uiStore.randomUser._id,
            param1: 34,
            param2: 50,
            param3: 45,
            param4: 12,
            param5: 43
          };
          this.that.answers.push(data);
          this.currentAnswers = [];
        }
        if (intersect.object.name === `terug_scherm`) {
          if (
            this.planeZ - this.questions[this.questionIndex].location.z - 150 === intersect.object.position.z ||
            this.planeZ - this.questions[this.questionIndex].location.z + 150 === intersect.object.position.z
          ) {
            this.questionIndex = 0;
            this.that.movementFreedom = 10000;
            this.that.popup.style.transform = `scale(1)`;
          }
        }
        if (intersect.object.name === `volgende_vraag`) {
          if (!this.questions[this.questionIndex + 1]) {
            const data = {
              question: this.questions[this.questionIndex].question,
              answer: this.currentAnswers,
              userId: this.that.uiStore.randomUser._id,
              param1: 34,
              param2: 50,
              param3: 45,
              param4: 12,
              param5: 43
            };
            this.questionIndex = 0;
            this.that.answers.push(data);
            this.that.answers.forEach(async answer => {
              await this.that.answerStore.create(answer);
            });
            this.sounds.forEach(sound => {
              if (sound.isPlaying) {
                sound.stop();
              }
            });
            this.currentAnswers = [];
            this.unmount();
            this.that.currentWorld = WORLD_POSITION.images;
            this.images.load(this.that);
            this.that.cameraRubberBanding.position.set(0, 0, WORLD_POSITION.images);
          } else {
            this.that.cameraRubberBanding.position.set(
              this.questions[this.questionIndex + 1].location.x,
              this.questions[this.questionIndex + 1].location.y,
              WORLD_POSITION.questions - this.questions[this.questionIndex + 1].location.z
            );
            const data = {
              question: this.questions[this.questionIndex].question,
              answers: this.currentAnswers,
              userId: this.that.uiStore.randomUser._id,
              param1: 34,
              param2: 50,
              param3: 45,
              param4: 12,
              param5: 43
            };
            this.that.answers.push(data);
            this.questionIndex += 1;
          }
        }
      });
    }
  };

  handleKeyDown = e => {};

  onMouseMove = e => {
    e.preventDefault();
    this.that.mouseMoved = true;
    this.that.mousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  };

  animate = () => {};
}

export default Questions;
