import {
  decorate,
  configure,
  observable,
  action,
  runInAction,
  observe
} from "mobx";
import Api from "../api";
import Question from "../models/Question";

configure({ enforceActions: `observed` });

class QuestionStore {
  questions = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`questions`);
    if (this.rootStore.uiStore.authAdmin) {
      this.findAll();
    }
    observe(this.rootStore.uiStore, `authAdmin`, change => {
      if (change.newValue) {
        this.findAll();
      } else {
        runInAction(() => (this.questions = []));
      }
    });
  }

  create = question => {
    const newQuestion = new Question();
    newQuestion.updateFromServer(question);
    this.questions.push(newQuestion);
    this.api
      .create(newQuestion)
      .then(data => newQuestion.updateFromServer(data));
  };

  update = question => {
    this.api.update(question).then(data => question.updateFromServer(data));
  };

  delete = question => {
    this.questions.remove(question);
    this.api.delete(question);
  };

  emptyQuestions = () => (this.questions = []);

  findAll = () => {
    this.emptyQuestions();
    return this.api.findAll().then(data =>{
      data.forEach(this._add);
      return data;
    });
  };

  _add = values => {
    const question = new Question();
    question.updateFromServer(values);
    runInAction(() => this.questions.push(question));
  };
}

decorate(QuestionStore, {
  questions: observable,
  findAll: action,
  _add: action,
  update: action,
  delete: action,
  create: action,
  emptyQuestions: action,
  getAll: action
});

export default QuestionStore;
