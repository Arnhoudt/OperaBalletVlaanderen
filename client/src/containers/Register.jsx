import React from "react";
import { Link } from "react-router-dom";
//import styles from "./Register.module.css";
import RegisterForm from "../components/auth/RegisterForm";
import withAuthentication from "../components/auth/WithAuthentication";
import { ROUTES } from "../constants";

const Register = () => {
  return (
    <>
      <div>
        <Link to={ROUTES.login}>Login</Link>
        <div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default withAuthentication(Register);
