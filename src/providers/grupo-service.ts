import { User } from './../model/user';
import { AngularFire, FirebaseListObservable, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { GrupoModel } from './../model/grupo';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base.service";

/*
  Generated class for the GrupoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GrupoService extends BaseService {
  grupos: FirebaseListObservable<GrupoModel[]>
  constructor(
    public http: Http,
    public af: AngularFire
  ) {
    super();
    console.log('Hello GrupoService Provider');
    this.setGrupos();
  }

  create(grupo: GrupoModel, userId): firebase.Promise<void> {
    this.af.database.list(`/usuarios/${userId}/grupos`).push({
      refGrupo: grupo.refGrupo
    })
    return this.af.database.list(`/grupos/${userId}`).push({
      grupo
    })
      .catch(this.handlePromiseError)
  }
  update(lastMessage:string, timestamp:any, refGrupo:string): firebase.Promise<void> {
    return this.af.database.object(`/chats`).update({
      lastMessage:lastMessage,
      timestamp:timestamp
    })
  }
  private setGrupos(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if (authState) {
          this.grupos = <FirebaseListObservable<GrupoModel[]>>this.af.database.list(`grupos/${authState.auth.uid}`, {
            query: {
              orderByChild: 'grupos/timestamp'
            }
          }).map((grupos: GrupoModel[]) => {
            return grupos.reverse();
          }).catch(this.handleObservableError)
        }
      });
  }
  addFriend(user:User, refGrupo, grupo:GrupoModel):firebase.Promise<void>{
    this.af.database.list(`grupos/${user.id}`).push({
      grupo
    })
    return this.af.database.list(`usuarios/${user.id}/grupos`).push({
      refGrupo:refGrupo
    })
  }
}
