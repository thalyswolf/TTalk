import { Message } from './../model/message';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";
import { BaseService } from "./base.service";
import firebase from 'firebase'


@Injectable()
export class MessageService extends BaseService {
  messages:FirebaseListObservable<Message[]>;
  constructor(public http: Http, public af: AngularFire) {
    super();
    console.log('Hello MessageService Provider');
    
  }


 

  create(msg: Message):firebase.Promise<Message> {
    let senderName = msg.senderName;
    let ref = firebase.database().ref();

    return ref.child('mensagens').child(msg.refChat).push({
      msg
    })
  }

  getMessages(ref:string){
    this.messages = <FirebaseListObservable<Message[]>>this.af.database.list(`mensagens/${ref}`)
    .catch(this.handleObservableError);
    return  this.messages
  }
  /*getMessages(id:string, id2:string):FirebaseListObservable<Message[]>{
    return <FirebaseListObservable<Message[]>>this.af.database.list(`mensagens/${id}${id2}`)
    .catch(this.handleObservableError)
  }*/
}

