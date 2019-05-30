import { decorate, observable, action } from "mobx";
import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";

class UiStore {
  authUser = null;
  authAdmin = null;
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authServiceUser = new Auth(`user`);
    this.authServiceAdmin = new Auth(`admin`);
    this.setUser(getUserFromCookie());
  }

  emptyError = () => {
    this.error = ``;
  };

  changeError = error => {
    this.error = error;
  };

  setUser = value => (this.authUser = value);
  setAdmin = value => (this.authAdmin = value);

  loginAdmin = (username, password) => {
    return this.authServiceAdmin
      .login(username, password)
      .then(data => {
        this.setAdmin(getUserFromCookie());
        this.emptyError();
        Promise.resolve();
      })
      .catch(data => {
        this.setAdmin(null);
        if (data.message === `Unexpected token P in JSON at position 0`) {
          this.changeError(`Verbinding verbroken`);
        } else {
          if (data.error) this.changeError(data.error);
          if (data.message) this.changeError(data.message);
        }
        Promise.reject();
      });
  };

  registerAdmin = (name, email, pwd) => {
    this.emptyError();
    return this.authServiceAdmin.register(name, email, pwd);
  };

  logoutAdmin = () => {
    return this.authServiceAdmin.logout().then(() => {
      this.setAdmin(null);
    });
  };

  loginUser = (username, password) => {
    return this.authServiceUser
      .login(username, password)
      .then(data => {
        this.setAdmin(getUserFromCookie());
        this.emptyError();
        Promise.resolve();
      })
      .catch(data => {
        this.setAdmin(null);
        if (data.message === `Unexpected token P in JSON at position 0`) {
          this.changeError(`Verbinding verbroken`);
        } else {
          if (data.error) this.changeError(data.error);
          if (data.message) this.changeError(data.message);
        }
        Promise.reject();
      });
  };

  registerUser = (name, email, pwd) => {
    this.emptyError();
    return this.authServiceUser.register(name, email, pwd);
  };

  logoutUser = () => {
    return this.authServiceUser.logout().then(() => {
      this.setAdmin(null);
    });
  };
}

decorate(UiStore, {
  authUser: observable,
  authAdmin: observable,
  setUser: action,
  setAdmin: action,
  changeError: action,
  loginAdmin: action,
  registerAdmin: action,
  logoutAdmin: action,
  loginUser: action,
  registerUser: action,
  logoutUser: action,
  error: observable,
  emptyError: action
});

export default UiStore;
