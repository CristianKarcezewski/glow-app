import * as SecureStore from "expo-secure-store";

export default class LocationsEmitter {
  statesKey = "statesCache";
  citiesKey = "citiesCache";

  constructor(filterEmitter) {
    this.subscribes = new Array();
    this.states = new Array();
    this._cities = new Array();
    this.cities = new Array();
    this.filterEmitter = filterEmitter;
    this._loadCache();
    this.filterEmitter.subscribe(
      "locationEmitter-filterCities",
      this._getCitiesByStateId.bind(this)
    );
  }

  _loadCache() {
    if (this.statesKey && this.states.length > 0) {
      SecureStore.getItemAsync(this.statesKey).then((states) => {
        if (states != null) {
          this.states = JSON.parse(states);

          this.states.forEach((st) => {
            let index = 0;
            let flag = true;

            while (flag) {
              flag = this._loadCity(st, index);
              if (flag) {
                index++;
              }
            }
          });
        }
      });
    }
  }

  _loadCity(st, index) {
    SecureStore.getItemAsync(`${this.citiesKey}-${st.stateId}-${index}`).then(
      (ct) => {
        if (ct != null) {
          this._cities.push(JSON.parse(ct));
          return true;
        } else {
          return false;
        }
      }
    );
  }

  _getCitiesByStateId() {
    if (this.filterEmitter.filter.stateId) {
      this.cities =
        this._cities.filter(
          (c) => c.stateId === this.filterEmitter.filter.stateId
        ) || [];
    }
  }

  _saveStates() {
    SecureStore.setItemAsync(this.statesKey, JSON.stringify(this.states));
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
    handler();
  }

  unsubscribe(key) {
    this.subscribes.filter((sub, index) => {
      if (sub.key === key) {
        this.subscribes.splice(index, 1);
      }
    });
  }

  _emit() {
    this._getCitiesByStateId();
    this.subscribes.map((sub) => {
      sub.handler();
    });
  }

  setStates(states) {
    this.states = states;
    this._saveStates();
    this._emit();
  }

  setCities(ct) {
    ct.forEach((ct, index) => {
      this._cities.push(ct);
      SecureStore.setItemAsync(
        `${this.citiesKey}-${ct.stateId}-${index}`,
        JSON.stringify(ct)
      );
    });
    this._emit();
  }
}
