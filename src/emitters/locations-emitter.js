export default class LocationsEmitter {
  constructor() {
    this.subscribes = [];
    this.states = [];
    this.cities = [];
  }

  subscribe(key, handler) {
    let position = null;
    this.cities = [];
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
    handler(this.userLoggedIn);
  }

  unsubscribe(key) {
    this.subscribes.filter((sub, index) => {
      if (sub.key === key) {
        this.subscribes.splice(index, 1);
      }
    });
  }

  emit() {
    this.subscribes.map((sub) => {
      sub.handler();
    });
  }

  getStateByIndex(index) {
    if (index) {
      return this.states[index];
    }
  }
}
