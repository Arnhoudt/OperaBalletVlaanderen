class Api {
  constructor(entity) {
    this.entity = entity;
  }

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
