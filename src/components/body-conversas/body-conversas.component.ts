import { Conversa } from './../../pages/conversa/conversa';
import { NavController } from 'ionic-angular';
import { User } from './../../model/user';
import { UserService } from './../../providers/user-service';
import { ChatService } from './../../providers/chat-service';
import { FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

/**
 * Generated class for the BodyConversas component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'body-conversas',
  templateUrl: 'body-conversas.component.html'
})
export class BodyConversas {
  currentUser:User;
  nome:string;
  foto:string;
  chats:FirebaseListObservable<any>;
  constructor(
    public chatService:ChatService,
    public userService:UserService,
    public navCtrl:NavController
  ) {
    this.chats = this.chatService.chats;
  }

   ionViewDidLoad(){
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) =>{
        this.currentUser = currentUser; 
        this.nome = currentUser.nome;
        this.foto = currentUser.foto;
        this.chats = this.chatService.chats;
      })
      
  }

  onChat(c):void{
    this.navCtrl.push(Conversa,{
      currentUser:this.currentUser,
      recipientUser:c.chat,
      friendId:c.$key,
      refChat:c.chat.refChat
    })
  }
}
