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

  create = character => {
    this.api.create(character).then(d => this._add(d));
  };

  update = character => {
    this.api.update(character).then(d => {
      this.characters.forEach((index, character) => {
        if (character._id === d._id) this.updateCharacter(index, d);
      });
    });
  };

  updateCharacter = (i, d) => {
    this.characters[i] = d;
  };

  delete = id => {
    this.characters.forEach((character, index) => {
      if (character._id === id) this.characters.splice(index, 1);
    });
    this.api.delete({ _id: id });
  };

  emptyCharacters = () => (this.characters = []);

  findAll = () => {
    this.emptyCharacters();
    this.api
      .findAll()
      .then(d => {
        d.forEach(this._add);
      })
      .catch(e => console.log(`Geen characters beschikbaar`));
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
  updateCharacter: action,
  emptyCharacters: action
});

export default CharacterStore;
