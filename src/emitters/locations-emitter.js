export default class LocationsEmitter {
  statesKey = "statesCache";
  citiesKey = "citiesCache";

  constructor() {
    this.subscribes = [];
    this.states = [];
    this.cities = [];
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

    if (this.states.length == 0) {
      this._handleLoadStates();
    }
  }

  _handleLoadStates() {
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200) {
          this.states = data;
        } else {
          Toast.show("Erro ao carregar localizações", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        Toast.show("Erro ao carregar localizações", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities(stateId) {
    loadCities(Platform.OS, stateId)
      .then(({ status, data }) => {
        if (status === 200) {
          this.cities = [...this.cities, data];
        } else {
          Toast.show("Erro ao carregar localizações", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        Toast.show("Erro ao carregar localizações", {
          duration: Toast.durations.LONG,
        });
      });
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

  async getCityByStateId(stateId) {
    let ct = this.cities.filter((c) => c.stateId == stateId);
    if (ct.length > 0) {
      return ct;
    } else {
    }
  }
}
