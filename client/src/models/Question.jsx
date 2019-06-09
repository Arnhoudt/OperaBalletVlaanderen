import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Question {
  constructor(question, type, location, answers, param1, param2, param3, param4, param5, id = uuid.v4()) {
    this.id = id;
    this.question = question;
    this.type = type;
    this.location = location;
    this.answers = answers;
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.param4 = param4;
    this.param5 = param5;
  }

  setId = value => (this.id = value);
  setQuestion = value => (this.question = value);
  setType = value => (this.type = value);
  setLocation = value => (this.location = value);
  setAnswers = value => (this.answers = value);
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
    this.setType(values.type);
    this.setLocation(values.location);
    this.setAnswers(values.answers);
    this.setParam1(values.param1);
    this.setParam2(values.param2);
    this.setParam3(values.param3);
    this.setParam4(values.param4);
    this.setParam5(values.param5);
  };
}

decorate(Question, {
  id: observable,
  question: observable,
  type: observable,
  location: observable,
  answers: observable,
  param1: observable,
  param2: observable,
  param3: observable,
  param4: observable,
  param5: observable,
  setId: action,
  setQuestion: action,
  setType: action,
  setLocation: action,
  setAnswers: action,
  setParam1: action,
  setParam2: action,
  setParam3: action,
  setParam4: action,
  setParam5: action
});

export default Question;
