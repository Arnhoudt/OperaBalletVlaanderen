import React from "react";
import { Link } from "react-router-dom";
//import styles from "./Register.module.css";
import RegisterForm from "../../../components/admin/auth/RegisterForm";
import withAuthentication from "../../../components/admin/auth/WithAuthentication";
import { ROUTES } from "../../../constants";

const Register = () => {
  return (
    <>
      <div>
        <Link to={ROUTES.dashboard}>
          <button>Terug</button>
        </Link>
        <div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default withAuthentication(Register);
