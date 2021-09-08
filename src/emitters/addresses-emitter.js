export default class AddressEmitter {
  constructor() {
    this.subscribes = new Array();
    this.addresses = new Array();
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
    this.subscribes.map((sub) => {
      sub.handler(this.addresses);
    });
  }

  setAddresses(addr) {
    if (addr?.length > 0) {
      addr.forEach((x) => this.addresses.push(x));
      this._emit();
    }
  }
}
