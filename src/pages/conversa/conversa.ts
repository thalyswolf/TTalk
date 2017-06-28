import { UserService } from './../../providers/user-service';
import { GrupoModel } from './../../model/grupo';
import { Add } from './../add/add';
import { ChatService } from './../../providers/chat-service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { MessageService } from './../../providers/message-service';
import { Message } from './../../model/message';
import { User } from './../../model/user';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Localizacao } from '../localizacao/localizacao';

@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html',
})

export class Conversa {
  @ViewChild(Content) content: Content;
  messages: FirebaseListObservable<Message[]>;
  currentUser: User;
  recipientUser: User;
  fotoAmigo: string;
  dataGroup: GrupoModel;
  idAmigo: string;
  refChat: string;
  userId: string;
  refGrupo: string;
  tipo: string;
  title: string;
  senderName: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public messageService: MessageService,
    public chatService: ChatService,
    public userService: UserService
  ) {
    this.currentUser = this.navParams.get('currentUser');
    this.userId = this.navParams.get('userId');
    this.tipo = this.navParams.get('tipo');

  }

  ionViewDidLoad() {



        if (this.tipo === "conversa") {
          this.recipientUser = this.navParams.get('recipientUser');
          this.fotoAmigo = this.recipientUser.foto;
          this.title = this.recipientUser.nome;
          this.idAmigo = this.navParams.get('friendId');
          this.refChat = this.navParams.get('refChat');
          this.senderName = this.navParams.get('senderName');
          this.messages = this.messageService.getMessages(this.refChat);
          if (this.refChat == null) {
            this.refChat = this.idAmigo + this.userId;
            console.log("entrou no if" + this.refChat);
            this.messages = this.messageService.getMessages(this.refChat);
          }

          this.messages
            
            .subscribe((message: Message[]) => {
              this.scrollToBottom();
              if (message.length === 0) {
                this.refChat = this.currentUser.$key + this.idAmigo;
                this.messages = this.messageService.getMessages(this.refChat);
                
              }         
            })
        } else if (this.tipo === "grupo") {
          this.title = this.navParams.get('nomeGrupo');
          this.refGrupo = this.navParams.get('refGrupo');
          this.messages = this.messageService.getMessages(this.refGrupo);
          this.dataGroup = this.navParams.get('dataGroup');
          this.messages
              .subscribe(()=>{
                this.scrollToBottom();
              })
      }
      
      
  }
  sendPosition() {
    this.navCtrl.push(Localizacao);
  }

  sendMessage(message) {
    if (this.tipo === "conversa") {
      let exist: boolean = false;
      let date: any = Date.now();
      let msg = new Message(this.currentUser.nome, this.userId, this.title,
                           this.idAmigo, date, message, this.refChat, null)
      this.messageService.create(msg);
      this.chatService.update(msg.text, date, this.currentUser.$key, this.idAmigo);
      this.chatService.update(msg.text, date, this.idAmigo, this.currentUser.$key);
    }
    if (this.tipo === "grupo") {
      let exist: boolean = false;
      let date: any = Date.now();
      let msg = new Message(this.currentUser.nome, this.userId, this.title,
                    null, date, message, this.refGrupo, this.currentUser.foto)
      this.messageService.create(msg);

    }
  }

  verUser(id: string): boolean {
    if (id == this.userId) {
      return true
    } else {
      return false
    }
  }

  onAdd(): void {
    this.navCtrl.push(Add, {
      ref: this.refGrupo,
      dataGroup: this.dataGroup
    });
  }
  public scrollToBottom(durantion?: number): boolean {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(durantion || 300);
      }
    }, 50);
    return true
  }
}
