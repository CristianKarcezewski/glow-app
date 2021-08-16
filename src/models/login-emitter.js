import * as SecureStore from 'expo-secure-store';

export default class LoginEmitter{

    constructor(){
        this.subsribes = [];
    }

    subscribe(handler){
        this.subsribes.push(handler);
    }

    emit(value){
        this.subsribes.map(handler => {
            handler(value);
        });
    }

    async saveToken(value){
        await SecureStore.setItemAsync('authorization', value);
        this.emit(value)
    }
}