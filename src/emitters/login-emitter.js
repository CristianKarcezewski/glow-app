import * as SecureStore from "expo-secure-store";
import { sub } from "react-native-reanimated";

export default class LoginEmitter {
  tokenKey = "authorization";

  constructor() {
    this.subscribes = [];
    this.readToken();
    this.token = null;
  }

  async readToken() {
    await SecureStore.getItemAsync(this.tokenKey).then((token) => {
      this.token = token;
      this.emit();
    });
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
      sub.handler(this.token);
    });
  }

  async login(value) {
    await SecureStore.setItemAsync(this.tokenKey, value);
    this.userLoggedIn = true;
    this.emit();
  }

  logout() {
    console.log("logout");
    this.userLoggedIn = false;
    this.emit();
  }
}
