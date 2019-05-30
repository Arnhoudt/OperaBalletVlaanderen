import React, { useState } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import form from "../../styles/form.module.css";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ uiStore, history }) => {
  const [email, setEmail] = useState(``);
  const [pwd, setPwd] = useState(``);
  const [pwd2, setPwd2] = useState(``);
  const [name, setName] = useState(``);
  const [error, setError] = useState(``);

  const handleChange = e => {
    if (e.currentTarget.name === `name`) setName(e.currentTarget.value);
    if (e.currentTarget.name === `email`) {
      setEmail(e.currentTarget.value);
      setError(``);
    }
    if (e.currentTarget.name === `pwd2`) setPwd2(e.currentTarget.value);
    if (e.currentTarget.name === `pwd`) setPwd(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    uiStore
      .register(name, email, pwd)
      .then(data => {
        history.push(ROUTES.dashboard);
      })
      .catch(data => {
        if (data.message === `Unexpected token P in JSON at position 0`)
          setError(`Verbinding verbroken`);
        else setError(data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_container}>
          <p className={styles.message}>Alle velden zijn vereist</p>
          <label htmlFor="name" className={styles.name}>
            <p className={styles.text}>Naam (bijnaam)</p>
            <input
              type="text"
              name="name"
              id="name="
              defaultValue={name}
              onChange={handleChange}
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
              defaultValue={email}
              onChange={handleChange}
              className={form.input}
              maxLength="128"
              required
            />
          </label>
          <p className={styles.error}>{error}</p>
          <label htmlFor="password" className={styles.password}>
            <p className={styles.text}>Wachtwoord</p>
            <input
              type="password"
              name="pwd"
              id="pwd"
              defaultValue={pwd}
              onChange={handleChange}
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
              onChange={handleChange}
              className={form.input}
              maxLength="128"
              required
            />
          </label>
          <input
            type="submit"
            defaultValue="Registreer"
            disabled={pwd && pwd !== pwd2}
            className={`${form.button} ${styles.button}`}
          />
        </div>
      </form>
    </>
  );
};

export default inject(`uiStore`)(withRouter(RegisterForm));
