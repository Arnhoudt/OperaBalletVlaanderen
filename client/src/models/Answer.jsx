import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Answer {
  constructor(question, answer, userId, param1, param2, param3, param4, param5, id = uuid.v4()) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.userId = userId;
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.param4 = param4;
    this.param5 = param5;
  }

  setId = value => (this.id = value);
  setQuestion = value => (this.question = value);
  setAnswer = value => (this.answer = value);
  setUserId = value => (this.userId = value);
  setParam1 = value => (this.param1 = value);
  setParam2 = value => (this.param2 = value);
  setParam3 = value => (this.param3 = value);
  setParam4 = value => (this.param4 = value);
  setParam5 = value => (this.param5 = value);

  updateFromServer = values => {
    if (values._id) {
      this.setId(values._id);
    }
    this.setQuestion(values.question);
    this.setAnswer(values.answer);
    this.setUserId(values.userId);
    this.setParam1(values.param1);
    this.setParam2(values.param2);
    this.setParam3(values.param3);
    this.setParam4(values.param4);
    this.setParam5(values.param5);
  };
}

decorate(Answer, {
  id: observable,
  question: observable,
  answer: observable,
  userId: observable,
  param1: observable,
  param2: observable,
  param3: observable,
  param4: observable,
  param5: observable,
  setId: action,
  setQuestion: action,
  setAnswer: action,
  setUserId: action,
  setParam1: action,
  setParam2: action,
  setParam3: action,
  setParam4: action,
  setParam5: action
});

export default Answer;
