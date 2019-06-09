import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../../components/admin/auth/RegisterForm";
import withAuthentication from "../../../components/admin/auth/WithAuthentication";
import { ROUTES } from "../../../constants";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <div>
        <Link to={ROUTES.dashboard}>
          <button className={styles.button}>
            <p>{`< Terug`}</p>
          </button>
        </Link>
        <div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default withAuthentication(Register);
