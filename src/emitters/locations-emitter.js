import * as SecureStore from "expo-secure-store";

export default class LocationsEmitter {
  statesKey = "statesCache";
  citiesKey = "citiesCache";

  constructor() {
    this.subscribes = new Array();
    this.states = new Array();
    this.cities = new Array();
    // this._loadCache();
  }

  _loadCache() {
    if (this.statesKey && this.states.length == 0) {
      SecureStore.getItemAsync(this.statesKey).then((states) => {
        if (states != null) {
          this.states = JSON.parse(states);

          this.states.forEach((st) => {
            let index = 0;
            let flag = true;

            while (flag) {
              this._loadCity(st, index).then((ct) => {
                if (ct != null) {
                  this.cities.push(JSON.parse(ct));
                  flag = true;
                } else {
                  flag = false;
                }
              });

              if (flag) {
                index = index + 1;
              }
              console.log(flag, index);
            }
          });
        }
      });
    }
  }

  _loadCity(st, index) {
    return SecureStore.getItemAsync(`${this.citiesKey}-${st.stateId}-${index}`);
  }

  getCitiesByStateId(stateId) {
    if (stateId) {
      return this.cities.filter((c) => c.stateId === stateId) || [];
    }
    return [];
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
      this.cities.push(ct);
      SecureStore.setItemAsync(
        `${this.citiesKey}-${ct.stateId}-${index}`,
        JSON.stringify(ct)
      );
    });
    this._emit();
  }
}
