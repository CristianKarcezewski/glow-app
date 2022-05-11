import AsyncStorage from "@react-native-async-storage/async-storage";

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
      AsyncStorage.getItem(this.statesKey).then((states) => {
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
            }
          });
        }
      });
    }
  }

  _loadCity(st, index) {
    return AsyncStorage.getItem(`${this.citiesKey}-${st.stateUf}-${index}`);
  }

  getCitiesByStateUf(stateUf) {
    if (stateUf) {
      return this.cities.filter((c) => c.stateUf === stateUf) || [];
    }
    return [];
  }

  _saveStates() {
    AsyncStorage.setItem(this.statesKey, JSON.stringify(this.states));
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
    // this._saveStates();
    this._emit();
  }

  setCities(ct) {
    ct.forEach((ct, index) => {
      this.cities.push(ct);
      // AsyncStorage.setItem(
      //   `${this.citiesKey}-${ct.stateUf}-${index}`,
      //   JSON.stringify(ct)
      // );
    });
    this._emit();
  }

  reset() {
    this.states = new Array();
    this.cities = new Array();
  }
}
