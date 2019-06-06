import AnswerStore from "./AnswerStore";
import QuestionStore from "./QuestionStore";
import ActStore from "./ActStore";
import UiStore from "./UiStore";
import CharacterStore from "./CharacterStore";

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.answerStore = new AnswerStore(this);
    this.questionStore = new QuestionStore(this);
    this.actStore = new ActStore(this);
    this.characterStore = new CharacterStore(this);
  }
}

export default new Store();
