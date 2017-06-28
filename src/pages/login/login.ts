import { AuthService } from './../../providers/auth-service';
import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, IonicApp } from 'ionic-angular';

import {Contatos} from '../contatos/contatos';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  credencial = [];
  email:string;
  senha:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService, public app:IonicApp) {
    this.authService.loginSuccessEventEmitter.subscribe(
      user => this.navCtrl.setRoot(Contatos)
      );
      this.authService.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  loginFacebook(){
    this.authService.loginFacebook();
  }
  loginComGoogle(){
    this.authService.loginGoogle();
  }


}
