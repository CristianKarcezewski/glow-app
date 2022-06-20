import * as SecureStore from "expo-secure-store";

export default class LoginEmitter {
  LoginEmmiterKey = "LoginEmmiterKey";

  constructor() {
    this.subscribes = [];
    this.userData = null;
    this.readUserData();
  }

  async readUserData() {
    await SecureStore.getItemAsync(this.LoginEmmiterKey).then((data) => {
      if (data != null) {
        this.userData = JSON.parse(data);
        this.emit();
      }
    });
  }

  async saveUserData() {
    await SecureStore.setItemAsync(
      this.LoginEmmiterKey,
      JSON.stringify(this.userData)
    );
  }

  async removeUserData() {
    await SecureStore.deleteItemAsync(this.LoginEmmiterKey);
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
      sub.handler();
    });
  }

  login(userData) {
    this.userData = userData;
    this.saveUserData();
    this.emit();
  }

  logout() {
    this.removeUserData();
    this.userData = null;
    this.emit();
  }

  reset() {
    this.userData = null;
    this.removeUserData();
  }
}
