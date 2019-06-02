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
      .loginAdmin(emailInput.current.value, pwdInput.current.value)
      .then(() => {
        history.push(ROUTES.dashboard);
      })
      .catch(data => {
        uiStore.setAdmin(null);
        if (data.message === `Unexpected token P in JSON at position 0`) {
          uiStore.changeError(`Verbinding verbroken`);
        } else {
          if (data.error) uiStore.changeError(data.error);
          if (data.message) uiStore.changeError(data.message);
        }
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
          <button type="submit" className={`${form.button} ${styles.button}`}>
            Inloggen
          </button>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(withRouter(observer(LoginForm)));
