import { decorate, observable, action } from "mobx";
import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";

class UiStore {
  authUser = null;
  error = ``;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authService = new Auth();
    this.socket = rootStore.socket;
    this.setUser(getUserFromCookie());
  }

  emptyError = () => {
    this.error = ``;
  };

  changeError = error => {
    this.error = error;
  };

  setUser = value => (this.authUser = value);

  login = (username, password) => {
    return this.authService
      .login(username, password)
      .then(data => {
        this.setUser(getUserFromCookie());
        this.emptyError();
        this.socket.connect(`https://localhost:5000`);
        Promise.resolve();
      })
      .catch(data => {
        this.setUser(null);
        if (data.message === `Unexpected token P in JSON at position 0`) {
          this.changeError(`Verbinding verbroken`);
        } else {
          if (data.error) this.changeError(data.error);
          if (data.message) this.changeError(data.message);
        }
        Promise.reject();
      });
  };

  register = (name, email, pwd) => {
    this.emptyError();
    return this.authService.register(name, email, pwd);
  };

  logout = () => {
    return this.authService.logout().then(() => {
      this.rootStore.chatStore.emptyMessages();
      this.setUser(null);
      this.socket.disconnect();
    });
  };
}

decorate(UiStore, {
  authUser: observable,
  setUser: action,
  changeError: action,
  login: action,
  register: action,
  logout: action,
  error: observable,
  emptyError: action
});

export default UiStore;
