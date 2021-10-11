import * as SecureStore from "expo-secure-store";

export default class LoginEmitter {
  tokenKey = "authorization";

  constructor() {
    this.subscribes = [];
    this.readUserData();
    this.userData = null;
    this.userLoggedIn = false;
  }

  async readUserData() {
    await SecureStore.getItemAsync(this.tokenKey).then((data) => {
      if (data != null) {
        this.userData = JSON.parse(data);
        this.userLoggedIn = true;
        this.emit();
      }
    });
  }

  async saveUserData(data) {
    await SecureStore.setItemAsync(this.tokenKey, JSON.stringify(data));
  }

  async removeUserData() {
    await SecureStore.deleteItemAsync(this.tokenKey);
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
    this.subscribes.forEach((sub) => {
      sub.handler(this.userLoggedIn);
    });
  }

  login(data) {
    this.userdata = data;
    this.userLoggedIn = true;
    this.emit();
    this.saveUserData(data);
  }

  logout() {
    this.removeUserData();
    this.userLoggedIn = false;
    this.emit();
  }

  reset() {
    this.userData = null;
    this.userLoggedIn = false;
  }
}
