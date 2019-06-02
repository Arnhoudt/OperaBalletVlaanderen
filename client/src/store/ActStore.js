import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class ActStore {
  acts = [];
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`acts`);
    this.findAll().catch(error => (this.error = error));
  }

  create = act => this.api.create(act).then(data => this._add(data));

  update = act => {
    this.api.update(act).then(data => {
      this.acts.forEach((act, index) => {
        if (act._id === data._id) {
          this.updateAct(data, index);
        }
      });
    });
  };

  updateAct = (data, index) => (this.acts[index] = data);

  delete = id => {
    this.api.delete({ _id: id }).then(data => {
      this.acts.forEach((act, index) => {
        if (act._id === id) {
          this.acts.splice(index, 1);
        }
      });
    });
  };

  emptyActs = () => (this.acts = []);

  findAll = () => {
    this.emptyActs();
    return this.api.findAll().then(data => {
      data.forEach(this._add);
      return data;
    });
  };

  findById = id => this.api.findById(id).then(data => data);

  _add = values => this.acts.push(values);
}

decorate(ActStore, {
  acts: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  updateAct: action,
  emptyActs: action,
  findById: action,
  error: observable
});

export default ActStore;
