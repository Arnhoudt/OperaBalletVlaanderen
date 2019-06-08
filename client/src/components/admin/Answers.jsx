import React, { Component } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Chart from "chart.js";
import styles from "./Answers.module.css";

class Answers extends Component {
  constructor(props) {
    super(props);
    this.answerStore = props.answerStore;
    this.colors = [`#ec5f67`, `#f99156`, `#fac863`, `#99c795`, `#5fb3b3`, `#6699cc`, `#c494c5`, `#aa7967`];
    this.state = { questions: [] };
    this.ref0 = React.createRef();
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.ref3 = React.createRef();
    this.ref4 = React.createRef();
    this.ref5 = React.createRef();
    this.ref6 = React.createRef();
    this.ref7 = React.createRef();
  }

  componentDidMount() {
    let state = { ...this.state };

    this.answerStore.answers.forEach(answer => {
      if (this.state.questions.filter(question => question.question === answer.question).length === 0) {
        let q = { question: answer.question, answers: [] };
        state.questions.push(q);
      }
      if (this.state.questions.filter(question => question.question === answer.question)[0].answers) {
        if (this.state.questions.filter(question => question.question === answer.question)[0].answers.filter(a => a.value === answer.answer).length > 0) {
          state.questions.filter(question => question.question === answer.question)[0].answers.filter(a => a.value === answer.answer)[0].count += 1;
        } else {
          state.questions.filter(question => question.question === answer.question)[0].answers.push({ value: answer.answer, count: 1 });
        }
      }
    });

    this.setState(state);

    this.state.questions.forEach((question, index) => {
      let answersData = [];
      let answersValue = [];
      question.answers.forEach(answer => answersData.push(answer.count));
      question.answers.forEach(answer => answersValue.push(answer.value));

      let config = {
        type: `doughnut`,
        data: {
          datasets: [
            {
              data: answersData,
              backgroundColor: this.colors,
              label: `Question 1`
            }
          ],
          labels: answersValue
        },
        options: {
          responsive: true,
          legend: {
            position: `right`
          },
          animation: {
            animateRotate: true
          }
        }
      };

      const myChartRef = this[`ref${0}`].current.getContext(`2d`);
      new Chart(myChartRef, config);
    });
  }

  render() {
    return (
      <>
        <div className={styles.containerChart}>
          <canvas ref={this[`ref${0}`]} />
        </div>
        {/* {this.state.questions.map((question, index) => (
          <div key={index} className={styles.containerChart}>
            <canvas ref={this[`ref${index}`]} />
          </div>
        ))} */}
      </>
    );
  }
}

Answers.propTypes = {
  answerStore: PropTypes.observableObject.isRequired
};

export default inject(`answerStore`)(observer(Answers));
