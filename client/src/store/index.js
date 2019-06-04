import AnswerStore from "./AnswerStore";
import QuestionStore from "./QuestionStore";
import ActStore from "./ActStore";
import UiStore from "./UiStore";
import pixiTest from "../pixi/pixiTest";

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.answerStore = new AnswerStore(this);
    this.questionStore = new QuestionStore(this);
    this.actStore = new ActStore(this);
    this.pixiTest = new pixiTest(this);
  }
}

export default new Store();
