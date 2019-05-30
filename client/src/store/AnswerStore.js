import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class AnswerStore {
  answers = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`answers`);
    this.findAll();
  }

  findAll = () => {
    this.api
      .findAll()
      .then(d => {
        d.forEach(this._add);
      })
      .catch(e => console.log(`Geen answers beschikbaar`));
  };

  _add = values => {
    this.answers.push(values);
  };
}

decorate(AnswerStore, {
  answers: observable,
  findAll: action,
  _add: action
});

export default AnswerStore;
