import AnswerStore from "./AnswerStore";
import ActStore from "./ActStore";
import UiStore from "./UiStore";
import CharacterStore from "./CharacterStore";
import QuestionStore from "./QuestionStore";

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.answerStore = new AnswerStore(this);
    this.actStore = new ActStore(this);
    this.characterStore = new CharacterStore(this);
    this.questionStore = new QuestionStore(this);
  }
}

export default new Store();
