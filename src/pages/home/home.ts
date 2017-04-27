import { User } from '../../model/user';
import {FacebookLogin} from "../../providers/facebook-login";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {UserProvider} from "../../providers/user";
import * as $ from 'jquery';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data:any;
  dados:FirebaseListObservable<any>;
  teste;

  constructor(public navCtrl: NavController, public fb:FacebookLogin, public angFire:AngularFire, public usr:UserProvider,public usuario:User) {

    this.onViewLoad();
  }
  onViewLoad(){
    this.usuario.setId(JSON.parse(window.localStorage.getItem('id')));
    this.usuario.setNome(JSON.parse(window.localStorage.getItem('nome')));
    this.usuario.setFoto (JSON.parse(window.localStorage.getItem('foto')));
    this.usuario.setEmail (JSON.parse(window.localStorage.getItem('email')));
    this.usuario.setStatus( window.localStorage.getItem('status'));
    this.usuario.setFrase (window.localStorage.getItem('frase'));
    window.localStorage.setItem('currentUser', JSON.stringify(this.usuario));
  }
  logout(){
    window.localStorage.removeItem('id');
    this.fb.logout();
    this.navCtrl.setRoot(Login)
  }
}
