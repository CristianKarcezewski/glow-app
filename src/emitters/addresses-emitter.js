export default class AddressEmitter {
  constructor() {
    this.subscribes = new Array();
    this.addresses = new Array();
    this.filter = {
      stateId: null,
      cityId: null,
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
    this.subscribes.map((sub) => {
      sub.handler();
    });
  }

  setAddresses(addr) {
    if (addr?.length > 0) {
      addr.forEach((x) => this.addresses.push(x));
      this._emit();
    }
  }
  
  setFilter(filter) {
    this.filter = filter;
    this._emit();
  }
}
