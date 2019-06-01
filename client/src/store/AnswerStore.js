import {
  decorate,
  configure,
  observable,
  action,
  observe,
  runInAction
} from "mobx";
import Api from "../api";

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
    return this.api.findAll().then(d => {
      d.forEach(this._add);
      return d;
    });
  };

  getAllByUser = () => {
    return this.api.getAllByUser().then(data => data);
  };

  create = answer => {
    return this.api.create(answer).then(data => this._add(data));
  };

  update = answer => {
    this.api.update(answer).then(data => {
      this.answers.forEach((index, answer) => {
        if (answer._id === data._id) this.updateAnswer(index, data);
      });
    });
  };

  updateAnswer = (i, data) => {
    this.answers[i] = data;
  };

  _add = values => {
    this.answers.push(values);
  };
}

decorate(AnswerStore, {
  answers: observable,
  findAll: action,
  _add: action,
  updateAnswer: action,
  update: action,
  create: action,
  emptyAnswers: action,
  getAllByUser: action
});

export default AnswerStore;
