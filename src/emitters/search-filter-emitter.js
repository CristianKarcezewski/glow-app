export default class SearchFilterEmitter {
  constructor() {
    this.subscribes = new Array();
    this.filter = {
      skip: 0,
      take: 10,
      favorites: false,
      providerType: null,
      state: null,
      city: null,
      latitude: null,
      longitude: null,
    };
    this.defaultFilter = this.filter;
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
      sub.handler(this.filter);
    });
  }

  setFilter(filter) {
    this.filter = filter;
    this._emit();
  }

  reset() {
    this.filter = this.defaultFilter;
  }
}
