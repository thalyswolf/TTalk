import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AdicionarAmigo } from '../adicionar-amigo/adicionar-amigo';
import { Conversa } from '../conversa/conversa';
/**
 * Generated class for the Contatos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class Contatos {
  rootPage: any = TabsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contatos');
  }
  Adicionar(){
    this.navCtrl.push(AdicionarAmigo);
  }

  verAmigo(){
    this.navCtrl.push(Conversa);
  }
}
