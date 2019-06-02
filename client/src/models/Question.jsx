import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Question {
  constructor(
    value,
    param1,
    param2,
    param3,
    param4,
    param5,
    answer1,
    answer2,
    id = uuid.v4()
  ) {
    this.id = id;
    this.value = value;
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.param4 = param4;
    this.param5 = param5;
    this.answer1 = answer1;
    this.answer2 = answer2;
  }

  setId = value => (this.id = value);
  setValue = value => (this.value = value);
  setParam1 = value => (this.param1 = value);
  setParam2 = value => (this.param2 = value);
  setParam3 = value => (this.param3 = value);
  setParam4 = value => (this.param4 = value);
  setParam5 = value => (this.param5 = value);
  setAnswer1 = value => (this.answer1 = value);
  setAnswer2 = value => (this.answer2 = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setValue(values.value);
    this.setParam1(values.param1);
    this.setParam2(values.param2);
    this.setParam3(values.param3);
    this.setParam4(values.param4);
    this.setAnswer1(values.answer1);
    this.setAnswer2(values.answer2);
  };
}

decorate(Question, {
  id: observable,
  value: observable,
  param1: observable,
  param2: observable,
  param3: observable,
  param4: observable,
  param5: observable,
  answer1: observable,
  answer2: observable,
  setId: action,
  setValue: action,
  setParam1: action,
  setParam2: action,
  setParam3: action,
  setParam4: action,
  setParam5: action,
  setAnswer1: action,
  setAnswer2: action
});

export default Question;
