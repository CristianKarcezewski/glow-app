import * as SecureStore from 'expo-secure-store';

export default class LoginEmitter{

  constructor(){
    this.subsribes = [];
    this.userLoggedIn = false;
  }

  subscribe(key,handler){
    let i = null;
    this.subsribes.forEach((x, index) => {
      if (x.key === key){i = index};
    })
    if(i){
      this.subsribes[i] = {'key': key,handler};
    }else{
      this.subsribes.push({'key': key,handler});
    };
  }

  emit(){
    this.subsribes.map(sub => {
      sub.handler(this.userLoggedIn, sub);
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