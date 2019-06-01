const sha1 = require(`sha1`);

class Auth {
  constructor(entity) {
    this.entity = entity;
  }

  login = (email, passwordS) => {
    const password = sha1(`${passwordS}natr1umchl0ride`);
    return fetch(
      `/auth/${this.entity}/login`,
      this.getOptions(`post`, { email, password })
    ).then(res => {
      return res.json().then(data => {
        if (res.status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(data);
        }
      });
    });
  };

  logout = () => {
    return fetch(`/auth/${this.entity}/logout`, this.getOptions(`post`));
  };

  register = (name, email, passwordS) => {
    const password = sha1(`${passwordS}natr1umchl0ride`);
    return fetch(
      `/auth/${this.entity}/register`,
      this.getOptions(`post`, { name, email, password })
    ).then(res => {
      return res.json().then(data => {
        if (res.status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(data);
        }
      });
    });
  };

  registerRandom = () => {
    return fetch(
      `/auth/${this.entity}/registerRandom`,
      this.getOptions(`post`)
    ).then(res => {
      return res.json().then(data => {
        if (res.status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(data);
        }
      });
    });
  };

  delete = () => {
    return fetch(`/auth/${this.entity}/delete`, this.getOptions(`delete`)).then(
      res => {
        return res.json().then(data => {
          if (res.status === 200) {
            return Promise.resolve(data);
          } else {
            return Promise.reject(data);
          }
        });
      }
    );
  };

  getOptions = (method, body = null) => {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "content-type": `application/json`
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  };
}

export default Auth;
