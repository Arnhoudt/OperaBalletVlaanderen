import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class CharacterStore {
  characters = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`characters`);
    if (this.rootStore.uiStore.authUser) this.findAll();
  }

  create = character => {
    this.api.create(character).then(d => this._add(d));
  };

  update = character => {
    this.api.update(character).then(d => {
      this.characters.forEach((index, character) => {
        if (character._id === d._id) this.characters[index] = d;
      });
    });
  };

  delete = id => {
    this.characters.forEach((index, character) => {
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
  create: action
});

export default CharacterStore;
