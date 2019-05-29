import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import form from "../../styles/form.module.css";
import styles from "./RegisterForm.module.css";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { email: ``, pwd: ``, pwd2: ``, name: ``, error: `` };
  }

  handleChange = e => {
    const input = e.currentTarget;
    const state = { ...this.state };
    state[input.name] = input.value;
    if (e.currentTarget.name === `email`) {
      state.error = ``;
    }
    this.setState(state);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { uiStore, history } = this.props;
    const { email, pwd, name } = this.state;
    uiStore
      .register(name, email, pwd)
      .then(data => {
        history.push(ROUTES.login);
      })
      .catch(data => {
        const state = { ...this.state };
        if (data.message === `Unexpected token P in JSON at position 0`)
          state.error = `Verbinding verbroken`;
        else state.error = data.message;
        this.setState(state);
      });
  };

  render() {
    const { email, pwd, pwd2, name } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.form_container}>
            <p className={styles.message}>Alle velden zijn vereist</p>
            <label htmlFor="name" className={styles.name}>
              <p className={styles.text}>Naam (bijnaam)</p>
              <input
                type="text"
                name="name"
                id="name="
                value={name}
                onChange={this.handleChange}
                className={form.input}
                maxLength="24"
                required
              />
            </label>
            <label htmlFor="email" className={styles.email}>
              <p className={styles.text}>Email</p>
              <input
                type="email"
                name="email"
                id="email="
                value={email}
                onChange={this.handleChange}
                className={form.input}
                maxLength="128"
                required
              />
            </label>
            <p className={styles.error}>{this.state.error}</p>
            <label htmlFor="password" className={styles.password}>
              <p className={styles.text}>Wachtwoord</p>
              <input
                type="password"
                name="pwd"
                id="pwd"
                value={pwd}
                onChange={this.handleChange}
                className={form.input}
                maxLength="128"
                required
              />
            </label>
            <label htmlFor="password" className={styles.password_repeat}>
              <p className={styles.text}>Herhaal wachtwoord</p>
              <input
                type="password"
                name="pwd2"
                id="pwd2"
                ref={pwd2}
                onChange={this.handleChange}
                className={form.input}
                maxLength="128"
                required
              />
            </label>
            <input
              type="submit"
              value="Registreer"
              disabled={pwd && pwd !== pwd2}
              className={`${form.button} ${styles.button}`}
            />
          </div>
        </form>
      </>
    );
  }
}

export default inject(`uiStore`)(withRouter(RegisterForm));
