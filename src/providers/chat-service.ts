import { Message } from './../model/message';
import { ChatModel } from './../model/chat';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base.service";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState } from "angularfire2";

/*
  Generated class for the ChatService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatService extends BaseService {
  chats: FirebaseListObservable<ChatModel[]>
  constructor(
    public http: Http,
    public af: AngularFire
  ) {
    super();
    this.setChats();
  }

  private setChats(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if (authState) {
          this.chats = <FirebaseListObservable<ChatModel[]>>this.af.database.list(`chats/${authState.auth.uid}`, {
            query: {
              orderByChild: 'chat/timestamp'
            }
          }).map((chats: ChatModel[]) => {
            return chats.reverse();
          }).catch(this.handleObservableError)
        }
      });
  }
    create(chat:ChatModel, userId1:string, userId2:string):firebase.Promise<void>{
    return this.af.database.object(`/chats/${userId1}/${userId2}`).update({
      chat
    })
    .catch(this.handlePromiseError)
  }

  create1(chat:ChatModel, userId1:string, userId2:string):firebase.Promise<void>{
    return this.af.database.object(`/chats/${userId2}/${userId1}/chat`).update({
      timestamp:chat.timestamp
    })
    .catch(this.handlePromiseError)
  }

  update(txt: string, timestamp: string, userId1: string, userId2: string): firebase.Promise<void> {
    return this.af.database.object(`/chats/${userId1}/${userId2}/chat`).update({
      timestamp: timestamp,
      lastMessage: txt
    })
      .catch(this.handlePromiseError)
  }

  getDeepChat(userId1: string, userId2: string): FirebaseObjectObservable<ChatModel> {
    return <FirebaseObjectObservable<ChatModel>>this.af.database.object(`/chats/${userId1}/${userId2}/chat`)
      .catch(this.handleObservableError);
  }
  isChatExist(userId:string, friendId: string): FirebaseObjectObservable<any>{
    return<FirebaseObjectObservable<any>> this.af.database.object(`/usuarios/${userId}/chats/`)
      .catch(this.handleObservableError);
  }
 
}