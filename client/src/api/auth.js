const sha1 = require(`sha1`);

class Auth {
  constructor(entity) {
    this.entity = entity;
  }

  login = async (email, passwordS) => {
    const password = await sha1(`${passwordS}natr1umchl0ride`);
    const r = await fetch(
      `/auth/${this.entity}/login`,
      this.getOptions(`post`, { email, password })
    );
    return await r.json();
  };

  logout = async () => {
    return await fetch(`/auth/${this.entity}/logout`, this.getOptions(`post`));
  };

  register = async (name, email, passwordS) => {
    const password = await sha1(`${passwordS}natr1umchl0ride`);
    const r = await fetch(
      `/auth/${this.entity}/register`,
      this.getOptions(`post`, { name, email, password })
    );
    return await r.json();
  };

  registerRandom = async () => {
    const r = await fetch(
      `/auth/${this.entity}/registerRandom`,
      this.getOptions(`post`)
    );
    return await r.json();
  };

  delete = async () => {
    const r = await fetch(
      `/auth/${this.entity}/delete`,
      this.getOptions(`delete`)
    );
    return await r.json();
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
