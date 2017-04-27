import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserProvider {

  constructor(public http: Http, public angFire:AngularFire) {
    console.log('Hello User Provider');
  }
  getUserData(id){
    let user:FirebaseListObservable<any>;
    user = this.angFire.database.list('/usuarios/'+id+'/');
    return user;
  }
}
