import { decorate, configure, observable, action, runInAction, observe } from "mobx";
import Api from "../api";
import Character from "../models/Character";

configure({ enforceActions: `observed` });

class CharacterStore {
  characters = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`characters`);
    if (this.rootStore.uiStore.authAdmin) {
      this.findAll();
    }
    observe(this.rootStore.uiStore, `authAdmin`, change => {
      if (change.newValue) {
        this.findAll();
      } else {
        runInAction(() => (this.characters = []));
      }
    });
  }

  create = character => {
    const newCharacter = new Character();
    newCharacter.updateFromServer(character);
    this.characters.push(newCharacter);
    this.api.create(newCharacter).then(data => newCharacter.updateFromServer(data));
  };

  update = character => {
    this.api.update(character).then(data => character.updateFromServer(data));
  };

  delete = character => {
    this.characters.remove(character);
    this.api.delete(character);
  };

  emptyCharacters = () => (this.characters = []);

  findAll = () => {
    this.emptyCharacters();
    return this.api.findAll().then(data => {
      data.forEach(this._add);
      return data;
    });
  };

  findById = id => this.api.findById(id).then(data => data);

  _add = values => {
    const character = new Character();
    character.updateFromServer(values);
    runInAction(() => this.characters.push(character));
  };
}

decorate(CharacterStore, {
  characters: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  emptyCharacters: action,
  findById: action
});

export default CharacterStore;
