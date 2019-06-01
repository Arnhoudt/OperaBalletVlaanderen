import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class ActStore {
  acts = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`acts`);
    this.findAll();
  }

  create = act => {
    this.api.create(act).then(d => this._add(d));
  };

  update = act => {
    this.api.update(act).then(d => {
      this.acts.forEach((act, index) => {
        if (act._id === d._id) this.updateAct(index, d);
      });
    });
  };

  updateAct = (i, d) => {
    this.acts[i] = d;
  };

  delete = id => {
    this.acts.forEach((act, index) => {
      if (act._id === id) {
        this.acts.splice(index, 1);
      }
    });
    this.api.delete({ _id: id });
  };

  emptyActs = () => (this.acts = []);

  findAll = () => {
    this.emptyActs();
    return this.api
      .findAll()
      .then(d => {
        d.forEach(this._add);
        Promise.resolve({ message: `succes` });
      })
      .catch(e => Promise.reject({ message: `failed` }));
  };

  _add = values => {
    this.acts.push(values);
  };
}

decorate(ActStore, {
  acts: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  updateAct: action,
  emptyActs: action
});

export default ActStore;
