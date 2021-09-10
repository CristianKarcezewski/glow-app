export default class SearchFilterEmitter {
  constructor() {
    this.subscribes = new Array();
    this.filter = {
      skip: 0,
      take: 10,
      favorites: false,
      stateId: null,
      cityId: null,
      search: null,
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
      sub.handler(this.filter);
    });
  }

  setFilter(filter) {
    this.filter = filter;
    this._emit();
  }
}
