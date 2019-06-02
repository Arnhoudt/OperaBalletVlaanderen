import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class CharacterStore {
  characters = [];
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`characters`);
    this.findAll().catch(error => (this.error = error));
  }

  create = character =>
    this.api.create(character).then(data => this._add(data));

  update = character => {
    this.api.update(character).then(data => {
      this.characters.forEach((character, index) => {
        if (character._id === data._id) {
          this.updateCharacter(data, index);
        }
      });
    });
  };

  updateCharacter = (data, index) => (this.characters[index] = data);

  delete = id => {
    this.api.delete({ _id: id }).then(data => {
      this.characters.forEach((character, index) => {
        if (character._id === id) {
          this.characters.splice(index, 1);
        }
      });
    });
  };

  emptyCharacters = () => (this.characters = []);

  findAll = () => {
    this.emptyCharacters();
    return this.api.findAll().then(data => {
      data.forEach(this._add);
      return data;
    });
  };

  _add = values => this.characters.push(values);
}

decorate(CharacterStore, {
  characters: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  updateCharacter: action,
  emptyCharacters: action,
  error: observable
});

export default CharacterStore;
