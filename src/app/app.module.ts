import { ChatBox } from './../components/chat-box/chat-box.component';
import { GooglePlus } from '@ionic-native/google-plus';
import { Login } from './../pages/login/login';
import { Contatos } from './../pages/contatos/contatos';
import { Conversa } from './../pages/conversa/conversa';
import { Localizacao } from './../pages/localizacao/localizacao';
import { Header } from './../components/header/header.component';
import { BodyConversas } from './../components/body-conversas/body-conversas.component';
import { Add } from './../pages/add/add';
import { GrupoService } from './../providers/grupo-service';
import { ChatService } from './../providers/chat-service';
import { MessageService } from './../providers/message-service';
import { AuthService } from './../providers/auth-service';

import { UserService } from './../providers/user-service';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Facebook } from '@ionic-native/facebook';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule , FirebaseAppConfig } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Http, HttpModule } from '@angular/http';
const config: FirebaseAppConfig = {
  apiKey: "AIzaSyCTxHj-z84CaTiM0qzshN6C7XQtHjKINm0",
  authDomain: "ttalk-b059c.firebaseapp.com",
  databaseURL: "https://ttalk-b059c.firebaseio.com",
  storageBucket: "ttalk-b059c.appspot.com",
  messagingSenderId: "766404922121"
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Contatos,
    Conversa,
    Localizacao,
    Header,
    BodyConversas,
    Add,
    ChatBox
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Contatos,
    Conversa,
    Localizacao,
    Header,
    BodyConversas,
    Add,
    ChatBox
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook,
    GoogleMaps,
    AuthService,
    UserService,
    ChatService,
    MessageService,
    GrupoService,
    GooglePlus
  ]
})
export class AppModule { }
