import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class QuestionStore {
  questions = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`questions`);
    this.findAll();
  }

  update = question => {
    this.api.update(question).then(d => {
      this.characters.forEach((index, character) => {
        if (character._id === d._id) this.characters[index] = d;
      });
    });
  };

  delete = question => {
    this.characters.remove(question);
    this.api.delete(question);
  };

  findAll = () => {
    this.api.findAll().then(d => {
      if (d.length > 0) d.forEach(this._add);
    });
  };

  _add = value => {
    this.answers.push(value);
  };
}

decorate(QuestionStore, {
  questions: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action
});

export default QuestionStore;
