class Api {
  constructor(entity) {
    this.entity = entity;
  }

  findAll = async () => {
    const r = await fetch(`/api/${this.entity}`, this.getOptions(`get`));
    return await r.json();
  };

  findById = async id => {
    const r = await fetch(`/api/${this.entity}/${id}`, this.getOptions(`get`));
    return await r.json();
  };

  findAllByUser = async () => {
    const r = await fetch(`/api/${this.entity}/user`, this.getOptions(`get`));
    return await r.json();
  };

  findAllByUserId = async id => {
    const r = await fetch(
      `/api/${this.entity}/user/${id}`,
      this.getOptions(`get`)
    );
    return await r.json();
  };

  create = async obj => {
    const r = await fetch(
      `/api/${this.entity}/add`,
      this.getOptions(`post`, obj)
    );
    return await r.json();
  };

  update = async obj => {
    const r = await fetch(
      `/api/${this.entity}/${obj.id}`,
      this.getOptions(`put`, obj)
    );
    return await r.json();
  };

  delete = async obj => {
    const r = await fetch(
      `/api/${this.entity}/${obj.id}`,
      this.getOptions(`delete`)
    );
    return r.json();
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

export default Api;
