import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Reaction {
  constructor(actId, userId, title, text, id = uuid.v4()) {
    this.id = id;
    this.actId = actId;
    this.userId = userId;
    this.title = title;
    this.text = text;
  }

  setId = value => (this.id = value);
  setActId = value => (this.actId = value);
  setUserId = value => (this.userId = value);
  setTitle = value => (this.title = value);
  setText = value => (this.text = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setActId(values.actId);
    this.setUserId(values.userId);
    this.setTitle(values.title);
    this.setText(values.text);
  };
}

decorate(Reaction, {
  id: observable,
  actId: observable,
  userId: observable,
  title: observable,
  text: observable,
  setId: action,
  setActId: action,
  setUserId: action,
  setTitle: action,
  setText: action
});

export default Reaction;
