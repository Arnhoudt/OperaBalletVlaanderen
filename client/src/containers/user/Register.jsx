import React from "react";
import { Link } from "react-router-dom";
//import styles from "./Register.module.css";
import RegisterForm from "../../components/user/auth/RegisterForm";
import { ROUTES } from "../../constants";

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

export default Register;
