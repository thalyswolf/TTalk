export class ChatModel {
    public nomeGrupo:string;
    constructor(
        public lastMessage: string,
        public timestamp: number,
        public nome: string,
        public foto: string,
        public refChat:string
    ) { }
}