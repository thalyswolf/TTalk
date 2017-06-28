import { User } from './../model/user';
import { FirebaseAuthState } from 'angularfire2';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseService {
  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;
  constructor(
    public http: Http,
    public af: AngularFire
  ) {
    super();
    this.listenAuthState();
  }
  private setUser(uidToExclude:string):void{
    this.users = <FirebaseListObservable<User[]>>this.af.database.list(`/usuarios`, {
      query:{
        orderByChild:'name',
      }
   }).map((users:User[]) =>{
      return users.filter((user:User) =>
        user.$key !== uidToExclude
      )
   });
  }

  private listenAuthState():void{
    this.af.auth
    .subscribe((authState:FirebaseAuthState) =>{
      if(authState){
        console.log('AuthState alterado');
        this.currentUser = this.af.database.object(`/usuarios/${authState.auth.uid}`);
        this.setUser(authState.auth.uid);
        console.log(this.currentUser);
      }
    })
  }

  userExists(username: string): Observable<boolean> {
    return this.af.database.list(`/users`, {
      query: {
        orderByChild: 'username',
        equalTo:username
      }
    }).map((users:User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

  refreshUser(uid, s, f, u): firebase.Promise<void>{
    return this.af.database.object(`/usuarios/${uid}`).update({
      status:s,
      usuario:u,
      frase:f
    })
  }

  get(userId):FirebaseObjectObservable<User>{
    return <FirebaseObjectObservable<User>>this.af.database.object(`usuarios/${userId}`)
    .catch(this.handleObservableError)
  }
  private user(){
    this.af.auth
    .subscribe((authState:FirebaseAuthState) =>{
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
      
    })
  }
}
