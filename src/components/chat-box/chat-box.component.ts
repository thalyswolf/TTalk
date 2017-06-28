import { Component, Input } from '@angular/core';
import { Message } from "../../model/message";

/**
 * Generated class for the ChatBox component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chat-box',
  templateUrl: 'chat-box.component.html',
   host:{
    '[style.justify-content]':'((!isFromSender) ? "flex-start":"flex-end")',
    '[style.text-align]':'((!isFromSender) ? "left":"right")'
  }
})
export class ChatBox {

  @Input() message:Message;
  @Input() isFromSender:boolean;
  @Input() isGrupo: boolean;
  viewTime:boolean = false;
  constructor() {

  }
  alterView():void{
    this.viewTime = !this.viewTime;
  }
}
