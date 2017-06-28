import { GrupoService } from './../../providers/grupo-service';
import { GrupoModel } from './../../model/grupo';
import { HomePage } from './../home/home';
import { ChatService } from './../../providers/chat-service';
import { ChatModel } from './../../model/chat';
import { User } from './../../model/user';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Conversa } from '../conversa/conversa';
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class Contatos {

  users: FirebaseListObservable<User[]>
  rootPage: any = HomePage;
  currentUser:any =[];
   refChat:string;
   userId:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public chatService: ChatService,
    public alertCtrl:AlertController,
    public grupoService:GrupoService
  ) {
    
    
    
  }

  ionViewDidLoad() {
    this.users = this.userService.users;
  }
  onGroupCreate() {
    let prompt = this.alertCtrl.create({
      title: 'Criar um grupo',
      message: "Nome do grupo",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Criar',
          handler: data => {
            console.log('Saved clicked'+data.nome);
            this.createGroup(data.nome);
          }
        }
      ]
    });
    prompt.present();
  }


verAmigo() {
  this.navCtrl.push(Conversa);
}



createChat(recipientUser: User): void {
  this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.userId = currentUser.$key;
        this.currentUser = currentUser;
        this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)
          .first()
          .subscribe((chat: ChatModel) => {
            console.log('Chat: ', chat);
            if (chat.hasOwnProperty('$value')) { //propiedade própia
              let timestamp = Date.now();
              
              this.refChat = currentUser.$key+recipientUser.$key;
              let chat1 = new ChatModel('', timestamp, recipientUser.nome, recipientUser.foto, this.refChat);
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key)

              let chat2 = new ChatModel('', timestamp, currentUser.nome,  currentUser.foto, this.refChat);
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key)
            } else {
              let timestamp = Date.now();
              let chat1 = new ChatModel('', timestamp, recipientUser.nome, recipientUser.foto, this.refChat);
              this.chatService.create1(chat1, currentUser.$key, recipientUser.$key)

              let chat2 = new ChatModel('', timestamp, currentUser.nome, currentUser.foto, this.refChat);
              this.chatService.create1(chat2, recipientUser.$key, currentUser.$key)
            }
          })
      })

  
  this.navCtrl.push(Conversa, {
    currentUser: this.currentUser,
    recipientUser: recipientUser,
    friendId: recipientUser.$key,
    refChat: this.refChat,
    tipo:'conversa',
    userId:this.userId,
   
  })
}

createGroup(nomeGrupo:string){
  this.userService.currentUser
  .first()
  .subscribe((currentUser:User)=>{
     let timestamp = Date.now();
     let grupo = new GrupoModel('', timestamp, nomeGrupo, '', currentUser.$key+timestamp);
     this.grupoService.create(grupo, currentUser.id)
  })
 
}
}