export class GrupoModel {
    constructor(
        public lastMessage: string,
        public timestamp: number,
        public nome: string,
        public foto: string,
        public refGrupo:string
    ) { }
}