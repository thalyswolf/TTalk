import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adicionar-amigo',
  templateUrl: 'adicionar-amigo.html',
})
export class AdicionarAmigo {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarAmigo');
  }

}
