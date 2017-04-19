import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Contatos } from '../pages/contatos/contatos';
import { Conversa } from '../pages/conversa/conversa';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Perfil } from '../pages/perfil/perfil';
import { StatusBar } from '@ionic-native/status-bar';
import {Facebook} from '@ionic-native/facebook';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdicionarAmigo } from '../pages/adicionar-amigo/adicionar-amigo';
import {FacebookLogin} from '../providers/facebook-login';
import { Http, HttpModule } from '@angular/http';
import firebase from 'firebase';
import {AuthProviders, AuthMethods, AngularFire} from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { PerfilProvider } from '../providers/perfil';
const config = {
    apiKey: "AIzaSyCTxHj-z84CaTiM0qzshN6C7XQtHjKINm0",
    authDomain: "ttalk-b059c.firebaseapp.com",
    databaseURL: "https://ttalk-b059c.firebaseio.com",
    projectId: "ttalk-b059c",
    storageBucket: "ttalk-b059c.appspot.com",
    messagingSenderId: "766404922121"
  };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    Login,
    Perfil,
    Contatos,
    AdicionarAmigo,
    Conversa
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    Login,
    Perfil,
    Contatos,
    AdicionarAmigo,
    Conversa
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookLogin,
    Facebook,
    PerfilProvider
  ]
})
export class AppModule {
  constructor(){
  firebase.initializeApp(config);
}
}
