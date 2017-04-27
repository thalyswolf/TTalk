import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerfilProvider } from '../../providers/perfil';
import { User } from '../../model/user';
import { UserProvider } from '../../providers/user';
import {FirebaseListObservable } from 'angularfire2';
import * as $ from 'jquery';
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class Perfil {
  data:any;
  dadosUser:any;
  dataUsr:any;
  constructor(public navCtrl: NavController, public perfil:PerfilProvider, private usr:UserProvider, private usuario:User) {
    this.onViewLoad();
  }
  onViewLoad(){
    this.usuario = JSON.parse(window.localStorage.getItem('currentUser'));
    this.dataUsr = this.usr.getUserData(this.usuario.id);
  }
  save(){
    this.perfil.save(this.usuario.id, this.usuario.nome, this.usuario.email, this.usuario.frase, this.usuario.status);
  }

  verStatus(){
    if (this.usuario.status=='d') {
        window.localStorage.setItem('status', this.usuario.status);
        $(".img-perfil").css("border", "3px solid green");
    }
    if (this.usuario.status=='o') {
        window.localStorage.setItem('status', this.usuario.status);
        $(".img-perfil").css("border", "3px solid red");
    }

    if (this.usuario.status=='a') {
        window.localStorage.setItem('status', this.usuario.status);
        $(".img-perfil").css("border", "3px solid yellow");
    }

    if (this.usuario.status=='i') {
        window.localStorage.setItem('status', this.usuario.status);
        $(".img-perfil").css("border", "3px solid white");
    }
    return true
  }
}
