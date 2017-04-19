import { User } from '../../model/user';
import {FacebookLogin} from "../../providers/facebook-login";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data:any;
  id:any;
  nome:any;
  foto:any;
  email:any;
  status:any;
  dados:FirebaseListObservable<any>;
  usuario = new User;
  constructor(public navCtrl: NavController, public fb:FacebookLogin, public angFire:AngularFire) {
    this.status = window.localStorage.getItem('status');
    this.onViewLoad();
  }
  onViewLoad(){
    this.data = window.localStorage.getItem('currentUser');

    this.data = JSON.parse(this.data);
    if (this.data == null) {
        this.navCtrl.setRoot(Login);
    }else {
      this.id = this.data.uid;
      this.nome = this.data.displayName;
      this.foto = this.data.photoURL;
      this.email = this.data.email;
      this.usuario.id = this.id;
      this.usuario.nome = this.nome;
      this.usuario.foto = this.foto;
      this.usuario.email = this.email;
      console.log('A classe usuario '+this.usuario.nome);
    }

  }
  logout(){
    window.localStorage.removeItem('currentUser');
    this.fb.logout();
  }
  ocupado(){
    if (this.status=='o') {
        return true
    }else{
      return false
    }
  }
  disponivel(){
    if (this.status=='d') {
        return true
    }else{
      return false
    }
  }
  ausente(){
    if (this.status=='a') {
        return true
    }else{
      return false
    }
  }
  invisivel(){
    if (this.status=='i') {
        return true
    }else{
      return false
    }
  }


}
