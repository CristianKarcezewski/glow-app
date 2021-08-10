import { EventEmitter } from "react-native";

export default class Loader{
  
  constructor(){
    this.emmiter = new EventEmitter();
    this.loader = false;
  }

  setStatus(bool){
    this.loader = bool;
    this.emmiter.emit();
  }

  getStatus(){
    return this.loader;
  }

  subscribe(handler){
    this.emmiter.addListener('loader',handler)
  }
}