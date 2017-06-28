import { GrupoModel } from './../../model/grupo';
import { UserService } from './../../providers/user-service';
import { FirebaseListObservable } from 'angularfire2';
import { GrupoService } from './../../providers/grupo-service';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Add page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class Add {
  users: FirebaseListObservable<User[]>
  ref:string;
  dataGroup:GrupoModel;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public grupoService:GrupoService,
    public userService: UserService,
    ) {
      this.users = this.userService.users;
      this.ref = this.navParams.get("ref");
      this.dataGroup = this.navParams.get('dataGroup');
  }

  ionViewDidLoad() {
    console.log(this.dataGroup);
    
  }
  pushFriend(user:User):void{
    this.grupoService.addFriend(user, this.ref, this.dataGroup);
    this.navCtrl.pop();
  }
}
