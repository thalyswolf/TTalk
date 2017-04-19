import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
/*
  Generated class for the Perfil provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PerfilProvider {

  constructor(public http: Http, public angFire:AngularFire) {
    console.log('Hello Perfil Provider');
  }

  save(id, nome, email, frase, status){
    let dados = [{
      nome:nome,
      email:email,
      frase:frase,
      status:status
    }];
    window.localStorage.setItem('dados', JSON.stringify(dados));
    let ref = firebase.database().ref();
      ref.child('usuarios').child(id).update({
        nome:nome,
        email:email,
        frase:frase,
        status:status
      });
  }
  getData(id){
    let dataUser:FirebaseListObservable<any>;
    dataUser = this.angFire.database.list('/usuarios/'+id+'/');
    return dataUser;
  }


}
