export default class ProviderEmitter {
  constructor() {
    this.subscribes = new Array();
    this.selectedProvider = null;
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
      sub.handler(this.selectedProvider);
    });
  }

  setProvider(id) {
    this.selectedProvider = id;
    this._emit();
  }

  reset() {
    this._emit();
    this.subscribes = new Array();
    this.selectedProvider = null;
  }
}
