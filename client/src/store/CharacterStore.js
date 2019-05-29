import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class CharacterStore {
  characters = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`characters`);
    this.findAll();
  }

  update = character => {
    this.api.update(character).then(d => {
      this.characters.forEach((index, character) => {
        if (character._id === d._id) this.characters[index] = d;
      });
    });
  };

  delete = character => {
    this.characters.remove(character);
    this.api.delete(character);
  };

  findAll = () => {
    this.api.findAll().then(d => {
      if (d.length > 0) d.forEach(this._add);
    });
  };

  _add = value => {
    this.characters.push(value);
  };
}

decorate(CharacterStore, {
  characters: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action
});

export default CharacterStore;
