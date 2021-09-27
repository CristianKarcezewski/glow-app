class ProviderRegisterEmitter {
  constructor() {
    this.subscribes = new Array();
    this.providerForm = {
      providerType: null,
      description: null,
      state: null,
      city: null,
      dailyWork: new Array(),
    };
  }

  subscribe(key, handler) {
    let position = null;
    this.subscribes.forEach((sub, index) => {
      if (sub.key === key) {
        position = index;
      }
    });
    if (position) {
      this.subscribes[position] = { key: key, handler };
    } else {
      this.subscribes.push({ key: key, handler });
    }
    handler(this.addresses);
  }

  unsubscribe(key) {
    this.subscribes.filter((sub, index) => {
      if (sub.key === key) {
        this.subscribes.splice(index, 1);
      }
    });
  }

  _emit() {
    this.subscribes.forEach((sub) => {
      sub.handler(this.providerForm);
    });
  }

  setProviderForm(form) {
    if (form) {
      this.providerForm = form;
    }
    this._emit();
  }
}

export default ProviderRegisterEmitter;
