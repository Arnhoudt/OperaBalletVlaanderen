class Auth {
  constructor(entity) {
    this.entity = entity;
  }

  login = (email, password) => {
    return fetch(`/auth/${this.entity}/login`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
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
    return fetch(`/auth/${this.entity}/logout`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      }
    });
  };

  register = (name, email, password) => {
    return fetch(`/auth/${this.entity}/register`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(res => {
      return res.json().then(data => {
        if (res.status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(data);
        }
      });
    });
  };
}

export default Auth;
