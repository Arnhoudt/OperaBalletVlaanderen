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
    if (this.rootStore.uiStore.authUser) {
      this.findAll();
    }
    observe(this.rootStore.uiStore, `authUser`, change => {
      if (change.newValue) {
        this.findAll();
      } else {
        runInAction(() => (this.answers = []));
      }
    });
  }

  findAll = () => {
    this.api.findAll().then(d => {
      if (d) d.forEach(this._add);
    });
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
