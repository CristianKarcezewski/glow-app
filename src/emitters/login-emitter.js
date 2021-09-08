import * as SecureStore from "expo-secure-store";

export default class LoginEmitter {
  tokenKey = "authorization";

  constructor() {
    this.subscribes = [];
    this.readToken();
    this.token = null;
    this.userLoggedIn = true;
  }

  async readToken() {
    await SecureStore.getItemAsync(this.tokenKey).then((token) => {
      if (token != null) {
        this.token = token;
        this.userLoggedIn = true;
        this.emit();
      }
    });
  }

  async saveToken(value) {
    await SecureStore.setItemAsync(this.tokenKey, value);
  }

  async removeToken() {
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
    this.subscribes.map((sub) => {
      sub.handler(this.userLoggedIn);
    });
  }

  login(value) {
    this.saveToken(value);
    this.userLoggedIn = true;
    this.emit();
  }

  logout() {
    this.removeToken();
    this.userLoggedIn = false;
    this.emit();
  }
}
