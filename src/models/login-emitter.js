import * as SecureStore from 'expo-secure-store';

export default class LoginEmitter{

  constructor(){
    this.subsribes = [];
    this.userLoggedIn = false;
  }

  subscribe(key,handler){
    let add = true
    this.subsribes.forEach(x => {
      if (x.key === key){add = false}
    })
    if (add){this.subsribes.push({'key': key,handler})};
  }

  emit(){
    this.subsribes.map(sub => {
      sub.handler(this.userLoggedIn);
    });
  }

  login(value){
    console.log('login: ',value);
    // await SecureStore.setItemAsync('authorization', value);
    this.userLoggedIn = true;
    this.emit();
  }

  logout(){
    console.log('logout');
    this.userLoggedIn = false;
    this.emit();
  }

}