import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LoginEmitter {
  tokenKey = "LoginEmmiterKey";

  constructor() {
    this.subscribes = [];
    this.readUserData();
    this.authorization = null;
    this.userLoggedIn = null;
  }

  async readUserData() {
    await AsyncStorage.getItem(this.tokenKey).then((data) => {
      if (data != null) {
        const info = JSON.parse(data);
        this.userLoggedIn = info.userType;
        this.authorization = info.token;
        this.emit();
      }
    });
  }

  async saveUserData() {
    await AsyncStorage.setItem(
      this.tokenKey,
      JSON.stringify({ token: this.authorization, userType: this.userLoggedIn })
    );
  }

  async removeUserData() {
    await AsyncStorage.removeItem(this.tokenKey);
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

  login(token, userLoggedIn) {
    this.authorization = token;
    this.userLoggedIn = userLoggedIn;
    this.emit();
    this.saveUserData();
  }

  logout() {
    this.removeUserData();
    this.userLoggedIn = null;
    this.authorization = null;
    this.emit();
  }

  reset() {
    this.authorization = null;
    this.userLoggedIn = false;
  }
}
