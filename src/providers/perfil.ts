import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class PerfilProvider {

  constructor(public http: Http, public angFire:AngularFire) {
    console.log('Hello Perfil Provider');
  }

  save(id, nome, email, frase, status){

    window.localStorage.setItem('frase', JSON.stringify(frase));
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
