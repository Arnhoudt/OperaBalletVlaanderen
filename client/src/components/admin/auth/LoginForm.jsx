import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { Link } from "react-router-dom";
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
        <div className={styles.grid}>
          <div className={styles.form_container}>
            <h1 className={styles.title}>Login Admin</h1>
            <div className={styles.formInputs}>
              <label htmlFor="email" className={styles.label}>
                <p className={styles.text}>Email</p>
                <input className={styles.input} type="email" name="email" id="email" ref={emailInput} maxLength="128" onChange={handleChange} required />
              </label>
              <label htmlFor="password" className={styles.label}>
                <p className={styles.text}>Wachtwoord</p>
                <input className={styles.input} type="password" name="password" id="password" ref={pwdInput} maxLength="128" onChange={handleChange} required />
              </label>
              <p className={styles.error}>{uiStore.error}</p>
            </div>
            <div className={styles.containerButtons}>
              <button type="submit" className={`${styles.button}`}>
                <p>Inloggen</p>
              </button>
              <Link to={ROUTES.threeScene}>
                <button className={styles.button}>
                  <p>Naar de site</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(withRouter(observer(LoginForm)));
