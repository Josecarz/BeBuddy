import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RatingService} from "../../providers/rating-service";
import {LoginPage} from "../login/login";
import {CommentsComponent} from "../../components/comments/comments";
import {DbApiService} from "../../providers/db-api.service";
import {HomePage} from "../home/home";
import {CreateTourComponent} from "../../components/create-tour/create-tour";
import {RegisterPage} from "../register/register";
import {Follow, Login, Rating} from "../../models/models";
import {UserService} from "../../providers/user-service";
import {AngularFireAuth} from "angularfire2/auth";
import {EditPerfilComponent} from "../../components/edit-perfil/edit-perfil";
import {DataProvider} from "../../providers/data";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: any;
  userInfo: any;
  buddy: any;
  buddyFinal: any;
  ratingInfo: any;
  lock: any;
  followUser: Follow = { id: '', name: '', img:'' };
  follows: any;
  isFollow: boolean;
  tours: any;
  finalTours: any;
  ratingUser: Rating = { rate: 0, votes: 0, points: 0 };
  constructor(public navCtrl: NavController, private dbapi: DbApiService,  private profile: UserService, private loadingCtrl: LoadingController, private auth: AngularFireAuth,
              private rating: RatingService, public navParams: NavParams, private dataService: DataProvider) {
    this.buddy = this.navParams.data;
    console.log(this.buddy)
    this.buddyFinal = this.buddy.profile;
  }


  ionViewWillEnter() {

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;

            this.dbapi.getFollows(this.userInfo.id).subscribe(
              (data) => {
                this.follows = data;
                this.checkFollow();
              }
            );
          }
        );
        this.profile.getUserRatingInfo(this.buddy.id).subscribe(
          (data) => {
            this.ratingInfo = data;
            if(this.ratingInfo == null){
              this.profile.addRatingToUser(this.buddy.id, this.ratingUser);
            }
          }
        );
        this.dbapi.getTours().subscribe(
          (data) => {
            this.tours = data;
            this.finalTours = this.dataService.filterByBuddy(this.buddyFinal.id, this.tours);
            //filtrar por mi id=buddy
          }
        );
      }
    });
  }


  follow(user){
    // console.log(user.id);
    this.followUser.id = user.profile.id;
    this.followUser.name = user.profile.name;
    this.followUser.img = user.profile.img;
    // console.log(this.followUser.id);
    this.profile.addUserToFollow(this.userInfo.id, this.followUser);
  }


  unfollow(user){
    this.profile.deleteUserToFollow(this.userInfo.id, user.profile.id);
    this.isFollow = false;
  }

  checkFollow(){
    //tengo que comprobar que el user sea follow o no
    for(let follow of this.follows){
      if(follow.id == this.buddy.profile.id){
        this.isFollow =true;
      } else {
        this.isFollow = false;
      }}
  }





}
