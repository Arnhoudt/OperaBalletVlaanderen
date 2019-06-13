import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Character {
  constructor(name, id = uuid.v4()) {
    this.id = id;
    this.name = name;
  }

  setId = value => (this.id = value);
  setName = value => (this.name = value);

  updateFromServer = values => {
    if (values._id) {
      this.setId(values._id);
    }
    this.setName(values.name);
  };
}

decorate(Character, {
  id: observable,
  name: observable,
  setId: action,
  setName: action,
  updateFromServer: action
});

export default Character;
