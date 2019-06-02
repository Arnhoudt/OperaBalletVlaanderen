import { decorate, observable, action } from "mobx";
import Auth from "../api/auth";
import {
  getUserFromCookie,
  getAdminFromCookie,
  getRandomFromCookie
} from "../utils/index.js";

class UiStore {
  authUser = null;
  authAdmin = null;
  randomUser = null;
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authServiceUser = new Auth(`user`);
    this.authServiceAdmin = new Auth(`admin`);
    this.setUser(getUserFromCookie());
    this.setAdmin(getAdminFromCookie());
    if (!getUserFromCookie()) {
      if (getRandomFromCookie()) {
        this.setRandomUser(getRandomFromCookie());
      }
      else {
        this.registerRandom();
      }
    }
  }

  emptyError = () => (this.error = ``);
  changeError = error => (this.error = error);

  setUser = value => (this.authUser = value);
  setAdmin = value => (this.authAdmin = value);
  setRandomUser = value => (this.randomUser = value);

  registerRandom = () => {
    this.emptyError();
    return this.authServiceUser
      .registerRandom()
      .then(data => this.setRandomUser(getRandomFromCookie()));
  };

  loginAdmin = (username, password) => {
    return this.authServiceAdmin
      .login(username, password)
      .then(data => {
        this.setAdmin(getAdminFromCookie());
        this.emptyError();
        return Promise.resolve(data);
      })
      .catch(data => {
        this.setAdmin(null);
        if (data.message === `Unexpected token P in JSON at position 0`) {
          this.changeError(`Verbinding verbroken`);
        } else {
          if (data.error) this.changeError(data.error);
          if (data.message) this.changeError(data.message);
        }
        return Promise.reject(data);
      });
  };

  registerAdmin = (name, email, pwd) => {
    this.emptyError();
    return this.authServiceAdmin.register(name, email, pwd);
  };

  logoutAdmin = () => {
    return this.authServiceAdmin.logout().then(data => this.setAdmin(null));
  };

  loginUser = (username, password) => {
    return this.authServiceUser
      .login(username, password)
      .then(data => {
        this.setUser(getUserFromCookie());
        this.emptyError();
        return Promise.resolve(data);
      })
      .catch(data => {
        this.setUser(null);
        if (data.message === `Unexpected token P in JSON at position 0`) {
          this.changeError(`Verbinding verbroken`);
        } else {
          if (data.error) this.changeError(data.error);
          if (data.message) this.changeError(data.message);
        }
        return Promise.reject(data);
      });
  };

  registerUser = (name, email, pwd) => {
    this.emptyError();
    return this.authServiceUser.register(name, email, pwd);
  };

  logoutUser = () => {
    return this.authServiceUser.logout().then(data => this.setUser(null));
  };

  deleteUser = () => {
    return this.authServiceUser.delete().then(data => {
      this.setUser(null);
      return data;
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
  emptyError: action,
  randomUser: observable,
  setRandomUser: action,
  registerRandom: action,
  deleteUser: action
});

export default UiStore;
