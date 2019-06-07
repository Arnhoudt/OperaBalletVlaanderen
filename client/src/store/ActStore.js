import { decorate, configure, observable, action, runInAction, observe } from "mobx";
import Api from "../api";
import Act from "../models/Act";

configure({ enforceActions: `observed` });

class ActStore {
  acts = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`acts`);
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

  create = act => {
    const newAct = new Act();
    newAct.updateFromServer(act);
    this.acts.push(newAct);
    this.api.create(newAct).then(data => newAct.updateFromServer(data));
  };

  update = act => {
    this.api.update(act).then(data => act.updateFromServer(data));
  };

  delete = act => {
    this.acts.remove(act);
    this.api.delete(act);
  };

  emptyActs = () => (this.acts = []);

  findAll = () => {
    this.emptyActs();
    this.api.findAll().then(data => data.forEach(this._add));
  };

  findById = id => this.api.findById(id).then(data => data);

  _add = values => {
    const act = new Act();
    act.updateFromServer(values);
    runInAction(() => this.acts.push(act));
  };
}

decorate(ActStore, {
  acts: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  emptyActs: action,
  findById: action
});

export default ActStore;
