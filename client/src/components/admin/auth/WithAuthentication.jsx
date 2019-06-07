// withAuthentication.jsx
import React from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { ROUTES } from "../../../constants";

const withAuthentication = ComponentToProtect => {
  const WithAuth = props => {
    if (!props.uiStore.authAdmin) {
      return <Redirect to={ROUTES.loginAdmin} />;
    }
    return <ComponentToProtect {...props} authAdmin={props.uiStore.authAdmin} />;
  };

  return inject(`uiStore`)(observer(WithAuth));
};
export default withAuthentication;
