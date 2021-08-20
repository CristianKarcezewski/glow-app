import * as SecureStore from "expo-secure-store";
import { sub } from "react-native-reanimated";

export default class LoginEmitter {
  constructor() {
    this.subscribes = [];
    this.userLoggedIn = false;
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
    console.log("login: ", value);
    // await SecureStore.setItemAsync('authorization', value);
    this.userLoggedIn = true;
    this.emit();
  }

  logout() {
    console.log("logout");
    this.userLoggedIn = false;
    this.emit();
  }
}
