import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class QuestionStore {
  questions = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`questions`);
    if (this.rootStore.uiStore.authUser) this.findAll();
  }

  create = question => {
    this.api.create(question).then(d => this._add(d));
  };

  update = question => {
    this.api.update(question).then(d => {
      this.characters.forEach((index, character) => {
        if (character._id === d._id) this.characters[index] = d;
      });
    });
  };

  delete = id => {
    this.questions.forEach((index, question) => {
      if (question._id === id) this.questions.splice(index, 1);
    });
    this.api.delete({ _id: id });
  };

  findAll = () => {
    this.api.findAll().then(d => {
      if (d) d.forEach(this._add);
    });
  };

  _add = values => {
    this.questions.push(values);
  };
}

decorate(QuestionStore, {
  questions: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action
});

export default QuestionStore;
