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
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`answers`);
    if (this.rootStore.uiStore.authAdmin) {
      this.findAll().catch(error => (this.error = error));
    }
    observe(this.rootStore.uiStore, `authAdmin`, change => {
      if (change.newValue) {
        this.findAll().catch(error => (this.error = error));
      } else {
        runInAction(() => (this.answers = []));
      }
    });
  }

  emptyAnswers = () => (this.answers = []);

  findAll = () => {
    this.emptyAnswers();
    return this.api.findAll().then(data => {
      data.forEach(this._add);
      return data;
    });
  };

  getAllByUser = () => this.api.getAllByUser().then(data => data);

  create = answer => this.api.create(answer).then(data => this._add(data));

  update = answer => {
    this.api.update(answer).then(data => {
      this.answers.forEach((answer, index) => {
        if (answer._id === data._id) {
          this.updateAnswer(data, index);
        }
      });
    });
  };

  updateAnswer = (data, index) => (this.answers[index] = data);

  _add = values => this.answers.push(values);
}

decorate(AnswerStore, {
  answers: observable,
  findAll: action,
  _add: action,
  updateAnswer: action,
  update: action,
  create: action,
  emptyAnswers: action,
  getAllByUser: action,
  error: observable
});

export default AnswerStore;
