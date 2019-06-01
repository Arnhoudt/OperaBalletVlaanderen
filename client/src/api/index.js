class Api {
  constructor(entity) {
    this.entity = entity;
  }

  findAll = async () => {
    const r = await fetch(`/api/${this.entity}`);
    return await r.json();
  };

  getAllByUser = async () => {
    const r = await fetch(`/api/${this.entity}/byUser`);
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
      `/api/${this.entity}/${obj._id}`,
      this.getOptions(`put`, obj)
    );
    return await r.json();
  };

  delete = async obj => {
    const r = await fetch(
      `/api/${this.entity}/${obj._id}`,
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
