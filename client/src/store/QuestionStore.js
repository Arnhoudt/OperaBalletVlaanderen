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
    this.findAll().then(mes => {
      this.updateCurrentQuestion();
    });
  }

  getAllQuestions = () =>{
    return this.findAll().then(e=>{
          return this.questions;
    });
  }

  getCurrentIndex = () => {
    return this.currentIndex;
  };

  setCurrentIndex = value => {
    this.currentIndex = value;
    this.updateCurrentQuestion();
  };

  updateCurrentQuestion = () => {
    this.questions.map((question, index) => {
      if (index === this.currentIndex) {
        this.currentQuestion = question;
      }
      return null;
    });
  };

  nextIndex = () => {
    let currentIndex = this.getCurrentIndex();
    this.setCurrentIndex((currentIndex += 1));
  };

  previousIndex = () => {
    let currentIndex = this.getCurrentIndex();
    this.setCurrentIndex((currentIndex -= 1));
  };

  create = question => {
    this.api.create(question).then(d => this._add(d));
  };

  update = question => {
    this.api.update(question).then(d => {
      this.questions.forEach((question, index) => {
        if (question._id === d._id) this.updateQuestion(index, d);
      });
    });
  };

  updateQuestion = (i, d) => {
    this.questions[i] = d;
  };

  delete = id => {
    this.questions.forEach((question, index) => {
      if (question._id === id) {
        this.questions.splice(index, 1);
      }
    });
    this.api.delete({ _id: id });
  };

  emptyQuestions = () => (this.questions = []);

  findAll = () => {
    this.emptyQuestions();
    return this.api
      .findAll()
      .then(d => {
        d.forEach(this._add);
        Promise.resolve({ message: `succes` });
      })
      .catch(e => Promise.reject({ message: `failed` }));
  };

  _add = values => {
    this.questions.push(values);
  };
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
  previousIndex: action,
  getAllQuestions: action
});

export default QuestionStore;
