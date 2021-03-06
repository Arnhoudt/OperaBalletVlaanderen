import { decorate, observable, action } from "mobx";
import Auth from "../api/auth";
import { getUserFromCookie, getAdminFromCookie, getRandomFromCookie } from "../utils/index.js";

class UiStore {
  authAdmin = null;
  randomUser = null;
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authServiceUser = new Auth(`user`);
    this.authServiceAdmin = new Auth(`admin`);
    this.setAdmin(getAdminFromCookie());
    if (!getUserFromCookie()) {
      if (getRandomFromCookie()) {
        this.setRandomUser(getRandomFromCookie());
      } else {
        this.registerRandom().catch(error => (this.error = error));
      }
    }
  }

  emptyError = () => (this.error = ``);
  changeError = error => (this.error = error);

  setAdmin = value => (this.authAdmin = value);
  setRandomUser = value => (this.randomUser = value);

  registerRandom = () => {
    this.emptyError();
    return this.authServiceUser.registerRandom().then(data => this.setRandomUser(getRandomFromCookie()));
  };

  loginAdmin = (username, password) => {
    return this.authServiceAdmin.login(username, password).then(data => {
      this.setAdmin(getAdminFromCookie());
      this.emptyError();
      return data;
    });
  };

  registerAdmin = (name, email, pwd) => {
    this.emptyError();
    return this.authServiceAdmin.register(name, email, pwd);
  };

  logoutAdmin = () => {
    return this.authServiceAdmin.logout().then(data => this.setAdmin(null));
  };
}

decorate(UiStore, {
  authAdmin: observable,
  setAdmin: action,
  changeError: action,
  loginAdmin: action,
  registerAdmin: action,
  logoutAdmin: action,
  error: observable,
  emptyError: action,
  randomUser: observable,
  setRandomUser: action,
  registerRandom: action
});

export default UiStore;
