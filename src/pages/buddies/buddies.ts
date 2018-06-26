import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RatingService} from "../../providers/rating-service";
import {DbApiService} from "../../providers/db-api.service";
import {FavouritesService} from "../../providers/favourites-service";
import {Storage} from "@ionic/storage";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";
import {PerfilPage} from "../perfil/perfil";
import {DataProvider} from "../../providers/data";

/**
 * Generated class for the BuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {

  followChat;
  usuario: any;
  userInfo: any;
  follows: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fav: FavouritesService,
              public storage: Storage,
              private dbapi: DbApiService,
              private rating: RatingService,
              private profile: UserService,
              private auth: AngularFireAuth,
              private dataService: DataProvider) {
  }

  ionViewWillEnter() {
    this.followChat = "Seguidos";

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.name);

            this.dbapi.getFollows(this.userInfo.id).subscribe(
              (data) => {
                this.follows = data;
                console.log(this.follows);
              }
            );
          }
        );
      }
    });
  }

  navUser(user) {
    console.log(user);
    this.dbapi.getUser(user.id).subscribe(
      (data) => {
        let userNuevo = data;
        this.navCtrl.push(PerfilPage, userNuevo);
      }
    );

  }


}
