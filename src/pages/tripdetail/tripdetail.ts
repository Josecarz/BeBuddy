import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import { Storage } from '@ionic/storage';
import {FavouritesService} from "../../providers/favourites-service";
import {RatingService} from "../../providers/rating-service";
import {CommentsComponent} from "../../components/comments/comments";
import {UserService} from "../../providers/user-service";
import {AngularFireAuth} from "angularfire2/auth";
import {Follow} from "../../models/models";

/**
 * Generated class for the TripdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tripdetail',
  templateUrl: 'tripdetail.html',
})
export class TripdetailPage {

  tour: any;
  cities = [];
  favourite: boolean;
  lock: any;
  user: any;
  flag: false;
  usuario: any;
  userInfo: any;
  followUser: Follow = { id: '', name: '', img:'' };
  follows: any;
  isFollow: boolean;
  isMe: boolean;
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fav: FavouritesService,
              public storage: Storage,
              private dbapi: DbApiService,
              private rating: RatingService,
              private profile: UserService,
              private auth: AngularFireAuth) {
    this.tour = this.navParams.data;
    // console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad TripdetailPage' + this.tour.id);
    this.fav.isFav(this.tour.id).then(value => this.favourite = value);

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
                this.checkFollow();
                this.checkMe();
              }
            );
          }
        );


      }
    });

    //Necesitamos la información del usuario que creo el tour
    this.dbapi.getInfoUserTour(this.tour.buddy).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      }
    );

  }

  ionViewWillLoad(){
    this.fav.isFav(this.tour);
  }

  changeFollow(tour){
    this.favourite = !this.favourite;

    if(this.favourite)
      this.fav.favoriteTour(tour)
    else
      this.fav.unfavoriteTour(tour);
  }

  rate($event, tour){
    this.rating.onModelChange($event, tour, 'tour');
  }

  navComment(tour){
    this.navCtrl.push(CommentsComponent, {'tour': tour, 'usuario': this.user});
  }


  follow(user){
    console.log(user.id);
    this.followUser.id = user.id;
    this.followUser.name = user.name;
    this.followUser.img = user.img;
    console.log(this.followUser.id);
    this.profile.addUserToFollow(this.userInfo.id, this.followUser);
  }


  unfollow(user){
    this.profile.deleteUserToFollow(this.userInfo.id, user.id);
    this.isFollow = false;
  }

  checkFollow(){
    //tengo que comprobar que el user sea follow o no
    for(let follow of this.follows){
      if(follow.id == this.user.id){
        this.isFollow =true;
      } else {
        this.isFollow = false;
      }}
  }

  checkMe(){
    if(this.tour.buddy == this.userInfo.id){
      this.isMe = true;
    } else {
      this.isMe = false;
    }
  }
}
