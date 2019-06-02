import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Answer {
  constructor(questionId, value, userId, id = uuid.v4()) {
    this.id = id;
    this.questionId = questionId;
    this.value = value;
    this.userId = userId;
  }

  setId = value => (this.id = value);
  setQuestionId = value => (this.questionId = value);
  setValue = value => (this.value = value);
  setUserId = value => (this.userId = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setQuestionId(values.questionId);
    this.setValue(values.value);
    this.setUserId(values.userId);
  };
}

decorate(Answer, {
  id: observable,
  questionId: observable,
  value: observable,
  userId: observable,
  setId: action,
  setQuestionId: action,
  setValue: action,
  setUserId: action
});

export default Answer;
