import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Subreaction {
  constructor(reactionId, userId, title, text, id = uuid.v4()) {
    this.id = id;
    this.reactionId = reactionId;
    this.userId = userId;
    this.title = title;
    this.text = text;
  }

  setId = value => (this.id = value);
  setReactionId = value => (this.reactionId = value);
  setUserId = value => (this.userId = value);
  setTitle = value => (this.title = value);
  setText = value => (this.text = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setReactionId(values.reactionId);
    this.setUserId(values.userId);
    this.setTitle(values.title);
    this.setText(values.text);
  };
}

decorate(Subreaction, {
  id: observable,
  reactionId: observable,
  userId: observable,
  title: observable,
  text: observable,
  setId: action,
  setReactionId: action,
  setUserId: action,
  setTitle: action,
  setText: action
});

export default Subreaction;
