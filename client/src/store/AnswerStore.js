import { decorate, configure } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class AnswerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`answers`);
  }
}

decorate(AnswerStore, {});

export default AnswerStore;
