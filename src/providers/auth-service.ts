import { AngularFire } from 'angularfire2';
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthService {
  loginSuccessEventEmitter: EventEmitter<any>;
  loginFalhaEventEmitter: EventEmitter<any>;
  logoutEventEmitter: EventEmitter<any>;

  constructor(public http: Http, public angFire: AngularFire, public platform: Platform, public fb: Facebook, public gp:GooglePlus) {
    this.loginSuccessEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();

  }

  loginFacebook() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then((res) => {
        const facebookCreds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCreds).then((res) => {
          let currentUser = firebase.auth().currentUser;
          this.callBackSuccessLogin(currentUser);
        }, (error) => {
          alert('sem sucesso');
          let currentUser = firebase.auth().currentUser;
          this.callBackSuccessLogin(currentUser);
        });

      })
    } else {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          console.log(result.user);
          return this.callBackSuccessLogin(result.user);
        }).catch(error => {
          return this.callBackFailLogin(error);
        })
    }
  }

  logout() {
    firebase.auth().signOut().then(resultado => this.logoutEventEmitter.emit(true)).catch(
      error => this.callBackFailLogin(error)
    )
  }
  

  loginGoogle() {
    if (this.platform.is('cordova')) {
      this.gp.login().then((res) => {
        const googleCreds = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(googleCreds).then((res) => {
          let currentUser = firebase.auth().currentUser;
          this.callBackSuccessLogin(currentUser);
        }, (error) => {
          alert('sem sucesso' + error);
        });
      })
    }
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log('o usuario é' + result.user.displayName);
        return this.callBackSuccessLogin(result.user);
      }).catch(error => {
        return this.callBackFailLogin(error);

      })
  }
  callBackSuccessLogin(user) {
    console.log('Callback de sucesso' + user.uid);
    console.log(user);
    
    this.loginSuccessEventEmitter.emit(user);
    
    this.registerFirebase(user);
  }

  registerFirebase(user) {
    let ref = firebase.database().ref();
    ref.child('usuarios').child(user.uid).update({
      id: user.uid,
      nome: user.displayName,
      foto: user.photoURL,
      email: user.email,
      status: 'd',
      frase: ' '
    });
  }
  callBackFailLogin(error) {
    window.localStorage.removeItem('currentUser');
    console.log('Callback de falha' + error);
  }

  verificaCadastro(id) {

  }
}