import * as SecureStore from "expo-secure-store";

export default class LocationsEmitter {
  statesKey = "statesCache";
  citiesKey = "citiesCache";

  constructor() {
    this.subscribes = new Array();
    this.states = new Array();
    this.cities = new Array();
    this._loadCache();
    this.subscribe("locationEmitter", this._saveData);
  }

  async _loadCache() {
    await SecureStore.getItemAsync(this.statesKey).then((states) => {
      if (states != null) {
        this.states = states;
      }
    });

    await SecureStore.getItemAsync(this.citiesKey).then((cities) => {
      if (cities != null) {
        this.cities = cities;
      }
    });
  }

  _saveData() {
    if (this.statesKey && this.states.length > 0) {
      SecureStore.setItemAsync(this.statesKey, this.states);
    }
    if (this.citiesKey && this.cities.length > 0) {
      SecureStore.setItemAsync(this.citiesKey, this.cities);
    }
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
    this.subscribes.map((sub) => {
      sub.handler();
    });
  }

  setStates(states) {
    this.states = states;
    this._emit();
  }

  setCities(ct) {
    ct.forEach((x) => this.cities.push(x));
    this._emit();
  }

  getCitiesByStateId(stateId) {
    return this.cities.filter((c) => c.stateId === stateId) || [];
  }
}
