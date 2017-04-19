import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import {AuthProviders, AuthMethods, AngularFire} from 'angularfire2';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Facebook} from '@ionic-native/facebook';
import { Menu } from '../pages/menu/menu';

/*
  Generated class for the FacebookLogin provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookLogin {
  loginSuccessEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public http: Http,  public angFire:AngularFire, public platform:Platform, public fb:Facebook ) {
    this.loginSuccessEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();

  }

  loginFacebook(){
    if (this.platform.is('cordova')) {
        this.fb.login(['email','public_profile', 'user_friends']).then((res)=>{
          const facebookCreds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCreds).then((res)=>{
            let currentUser = firebase.auth().currentUser;
            this.callBackSuccessLogin(currentUser);
          },(error)=>{
            alert('sem sucesso'+error);
          });
        })
    }
    let provider = new firebase.auth.FacebookAuthProvider();
   firebase.auth().signInWithPopup(provider)
  .then(result =>{
    console.log(result.user);
    return this.callBackSuccessLogin(result.user);
  }).catch(error => {
    return this.callBackFailLogin(error);

  })
}

  logout(){
    firebase.auth().signOut().then(resultado => this.logoutEventEmitter.emit(true)).catch(
      error => this.callBackFailLogin(error)
    )
  }
  loginCredencial(credencial){
    firebase.auth().signInWithEmailAndPassword(credencial.email, credencial.senha)
  .then(resultado => this.callBackSuccessLogin(resultado)).catch(
    error => this.callBackFailLogin(error)
  )
  }

  loginGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithPopup(provider)
  .then(result =>{
    console.log('o usuario é'+result.user.displayName);
    return this.callBackSuccessLogin(result.user);
  }).catch(error => {
    return this.callBackFailLogin(error);

  })
  }
  callBackSuccessLogin(user){
    console.log('Callback de sucesso');
    this.loginSuccessEventEmitter.emit(user);

    window.localStorage.setItem('currentUser', JSON.stringify(user));
    window.localStorage.setItem('statusUser', 'd');
    this.registerFirebase(user);
  }

  registerFirebase(user){

    let ref = firebase.database().ref();
      ref.child('usuarios').child(user.uid).update({
        nome:user.displayName,
        foto:user.photoURL,
        email:user.email,
        status:'d'
      });

  }
  callBackFailLogin(error){
    window.localStorage.removeItem('currentUser');
    console.log('Callback de falha'+error);
  }
}
