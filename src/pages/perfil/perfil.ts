import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerfilProvider } from '../../providers/perfil';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class Perfil {
  data:any;
  dadosUser:any;
  id:any;
  nome:any;
  foto:any;
  email:any;
  status:any;
  class:any;
  frase:string;
  usuario:string;
  constructor(public navCtrl: NavController, public perfil:PerfilProvider) {
    this.onViewLoad();
  }
  ocupado(){
    if (this.status=='o') {
        window.localStorage.setItem('status', this.status);
        return true
    }else{
      return false
    }
  }
  disponivel(){
    if (this.status=='d') {
        window.localStorage.setItem('status', this.status);
        return true
    }else{
      return false
    }
  }
  ausente(){
    if (this.status=='a') {
        window.localStorage.setItem('status', this.status);
        return true
    }else{
      return false
    }
  }
  invisivel(){
    if (this.status=='i') {
        window.localStorage.setItem('status', this.status);
        return true
    }else{
      return false
    }
  }
  onViewLoad(){
    this.data = JSON.parse(window.localStorage.getItem('currentUser'));
    this.id = this.data.uid;
    this.nome = this.data.displayName;
    this.foto = this.data.photoURL;
    this.email = this.data.email;
    this.dadosUser = JSON.parse(window.localStorage.getItem('dados'));
    this.status = window.localStorage.getItem('status');
    this.frase = this.dadosUser.frase;
    this.usuario = this.dadosUser.usuario;
  }
  save(){
    this.perfil.save(this.id, this.nome, this.email, this.frase, this.status);
  }
}
