import { decorate, configure, observable, action, observe, runInAction } from "mobx";
import Api from "../api";
import Answer from "../models/Answer";

configure({ enforceActions: `observed` });

class AnswerStore {
  answers = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`answers`);
    if (this.rootStore.uiStore.authAdmin) {
      this.findAll();
    }
    observe(this.rootStore.uiStore, `authAdmin`, change => {
      if (change.newValue) {
        this.findAll();
      } else {
        runInAction(() => (this.answers = []));
      }
    });
  }

  emptyAnswers = () => (this.answers = []);

  findAll = () => {
    this.emptyAnswers();
    this.api.findAll().then(data => data.forEach(this._add));
  };

  findAllByUser = () => this.api.findAllByUser().then(data => data);

  create = answer => {
    const newAnswer = new Answer();
    newAnswer.updateFromServer(answer);
    this.answers.push(newAnswer);
    this.api.create(newAnswer).then(data => newAnswer.updateFromServer(data));
  };

  update = answer => {
    this.api.update(answer).then(data => answer.updateFromServer(data));
  };

  delete = answer => {
    this.answers.remove(answer);
    this.api.delete(answer);
  };

  _add = values => {
    const answer = new Answer();
    answer.updateFromServer(values);
    runInAction(() => this.answers.push(answer));
  };
}

decorate(AnswerStore, {
  answers: observable,
  findAll: action,
  _add: action,
  update: action,
  create: action,
  emptyAnswers: action,
  findAllByUser: action,
  delete: action
});

export default AnswerStore;
