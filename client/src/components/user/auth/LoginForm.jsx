import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../../constants";
import form from "../../../styles/form.module.css";
import styles from "./LoginForm.module.css";

const LoginForm = ({ uiStore, history }) => {
  const emailInput = React.createRef();
  const pwdInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    uiStore
      .loginUser(emailInput.current.value, pwdInput.current.value)
      .then(() => {
        history.push(ROUTES.home);
      });
  };

  const handleChange = e => {
    uiStore.emptyError();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_container}>
          <label htmlFor="email" className={styles.email}>
            <p className={styles.text}>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailInput}
              className={form.input}
              maxLength="128"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password" className={styles.password}>
            <p className={styles.text}>Wachtwoord</p>
            <input
              type="password"
              name="password"
              id="password"
              ref={pwdInput}
              className={form.input}
              maxLength="128"
              onChange={handleChange}
              required
            />
          </label>
          <p className={styles.error}>{uiStore.error}</p>
          <input
            type="submit"
            value="Inloggen"
            className={`${form.button} ${styles.button}`}
          />
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(observer(withRouter(LoginForm)));
