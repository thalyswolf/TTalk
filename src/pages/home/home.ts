import { GrupoService } from './../../providers/grupo-service';

import { Conversa } from './../conversa/conversa';
import { ChatModel } from './../../model/chat';
import { ChatService } from './../../providers/chat-service';
import { UserService } from './../../providers/user-service';
import { User } from './../../model/user';


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser:User;
  nome:string;
  foto:string;
  chats:FirebaseListObservable<any>;
  grupos:FirebaseListObservable<any>;
  view:string = 'conversas';
  constructor(
    public userService:UserService,
    public chatService:ChatService,
    public navCtrl:NavController,
    public grupoService:GrupoService
  ){
    
  }

  ionViewDidLoad(){
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) =>{
        this.currentUser = currentUser; 
        this.nome = currentUser.nome;
        this.foto = currentUser.foto;
        this.chats = this.chatService.chats;
        this.grupos = this.grupoService.grupos;
      })
      
  }

  onChat(c):void{
    this.navCtrl.push(Conversa,{
      currentUser:this.currentUser,
      recipientUser:c.chat,
      friendId:c.$key,
      refChat:c.chat.refChat,
      tipo:"conversa",
      userId:this.currentUser.$key,
      foto:c.chat.foto
    })
  }
  onGrupo(g):void{
    this.navCtrl.push(Conversa,{
      currentUser:this.currentUser,
      dataGroup:g.grupo,
      nomeGrupo:g.grupo.nome,
      refGrupo:g.grupo.refGrupo,
      tipo:"grupo",
      userId:this.currentUser.$key
    })
  }

}
