import { loadStates, loadCities } from "../services/location-service";

export default class LocationsEmitter {
  statesKey = "statesCache";
  citiesKey = "citiesCache";

  constructor(platform) {
    this.subscribes = [];
    this.states = [];
    this.cities = [];
    this._loadCache(platform);
  }

  async _loadCache(platform) {
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
      this._handleLoadStates(platform);
    }
  }

  async _handleLoadStates(platform) {
    await loadStates(platform)
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

  async _handleLoadCities(platform, stateId) {
    await loadCities(platform, stateId)
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

  async getCityByStateId(platform, stateId) {
    let ct = this.cities.filter((c) => c.stateId == stateId);
    if (ct.length > 0) {
      return ct;
    } else {
      await this._handleLoadCities(platform, stateId);
      return this.cities.filter((c) => c.stateId == stateId);
    }
  }
}
