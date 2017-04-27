import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicApp } from 'ionic-angular';
import {FacebookLogin} from '../../providers/facebook-login';
import {Contatos} from '../contatos/contatos';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  credencial = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fbLogin:FacebookLogin, public app:IonicApp) {
    this.fbLogin.loginSuccessEventEmitter.subscribe(
      user => this.navCtrl.setRoot(Contatos));

      this.fbLogin.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  loginFacebook(){
    this.fbLogin.loginFacebook();
  }

  loginComCredencial(){
    this.fbLogin.loginCredencial(this.credencial);
  }

  loginComGoogle(){
    this.fbLogin.loginGoogle();
  }

}
