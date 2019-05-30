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

class CharacterStore {
  characters = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`characters`);
    if (this.rootStore.uiStore.authUser) {
      this.findAll();
    }
    observe(this.rootStore.uiStore, `authUser`, change => {
      if (change.newValue) {
        this.findAll();
      } else {
        runInAction(() => (this.characters = []));
      }
    });
  }

  create = character => {
    this.api.create(character).then(d => this._add(d));
  };

  update = character => {
    this.api.update(character).then(d => {
      this.characters.forEach((index, character) => {
        if (character._id === d._id) this.updateQuestion(index, d);
      });
    });
  };

  updateQuestion = (i, d) => {
    this.characters[i] = d;
  };

  delete = id => {
    this.characters.forEach((character, index) => {
      if (character._id === id) this.characters.splice(index, 1);
    });
    this.api.delete({ _id: id });
  };

  findAll = () => {
    this.api.findAll().then(d => {
      if (d.length > 0) d.forEach(this._add);
    });
  };

  _add = values => {
    this.characters.push(values);
  };
}

decorate(CharacterStore, {
  characters: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  updateQuestion: action
});

export default CharacterStore;
