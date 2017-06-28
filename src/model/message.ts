export class Message{
    
    constructor(
        public senderName:string,
        public senderId:string,
        public receiverName:string,
        public receiverId:string,
        public date:number,
        public text:string,
        public refChat:string,
        public senderPhoto:string
    ){}
}