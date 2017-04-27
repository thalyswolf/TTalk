import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Contatos } from '../pages/contatos/contatos';
import { Localizacao } from '../pages/localizacao/localizacao';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any = Login;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
