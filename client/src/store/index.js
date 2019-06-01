import AnswerStore from "./AnswerStore";
import CharacterStore from "./CharacterStore";
import QuestionStore from "./QuestionStore";
import ActStore from "./ActStore";
import UiStore from "./UiStore";

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.answerStore = new AnswerStore(this);
    this.characterStore = new CharacterStore(this);
    this.questionStore = new QuestionStore(this);
    this.actStore = new ActStore(this);
  }
}

export default new Store();
