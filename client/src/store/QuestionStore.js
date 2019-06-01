import { decorate, configure, observable, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });

class QuestionStore {
  questions = [];
  currentIndex = 0;
  currentQuestion = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`questions`);
    this.findAll().then(data => this.updateCurrentQuestion());
  }

  getCurrentIndex = () => this.currentIndex;

  setCurrentIndex = value => {
    this.currentIndex = value;
    this.updateCurrentQuestion();
  };

  updateCurrentQuestion = () => {
    this.questions.forEach((question, i) => {
      if (i === this.currentIndex) this.currentQuestion = question;
    });
  };

  nextIndex = () => this.setCurrentIndex((this.currentIndex += 1));
  previousIndex = () => this.setCurrentIndex((this.currentIndex -= 1));

  create = question => this.api.create(question).then(data => this._add(data));

  update = question => {
    this.api.update(question).then(data => {
      this.questions.forEach((question, i) => {
        if (question._id === data._id) this.updateQuestion(data, i);
      });
    });
  };

  updateQuestion = (data, i) => (this.questions[i] = data);

  delete = id => {
    this.api.delete({ _id: id }).then(data => {
      this.questions.forEach((question, i) => {
        if (question._id === id) this.questions.splice(i, 1);
      });
    });
  };

  emptyQuestions = () => (this.questions = []);

  findAll = () => {
    this.emptyQuestions();
    return this.api.findAll().then(data => {
      data.forEach(this._add);
      return data;
    });
  };

  _add = values => this.questions.push(values);
}

decorate(QuestionStore, {
  questions: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  updateQuestion: action,
  currentIndex: observable,
  getCurrentIndex: action,
  setCurrentIndex: action,
  nextIndex: action,
  currentQuestion: observable,
  updateCurrentQuestion: action,
  emptyQuestions: action,
  previousIndex: action
});

export default QuestionStore;
