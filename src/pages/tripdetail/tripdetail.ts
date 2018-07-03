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
import {ChatService} from "../../providers/chat-service";
import {ChatPage} from "../chat/chat";

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
  isChat: boolean;
  isMe: boolean;
  chats: any;
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  chatId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fav: FavouritesService,
              public storage: Storage,
              private dbapi: DbApiService,
              private rating: RatingService,
              private profile: UserService,
              private auth: AngularFireAuth,
              private chat: ChatService) {
    this.tour = this.navParams.data;
    // console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewWillEnter() {
    this.fav.isFav(this.tour.id).then(value => this.favourite = value);

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
                this.checkMe();
              }
            );
            this.chat.getChats(this.userInfo.id).subscribe(
              (data) => {
                this.chats = data;
                console.log(this.chats);
                this.checkChat();
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
    // for(let follow of this.follows){
    //   if(follow.id == this.user.id){
    //     this.isFollow =true;
    //   } else {
    //     this.isFollow = false;
    //   }}
    this.isFollow= this.follows.find((follow)=>follow.id ==this.user.id)
  }

  checkChat(){
    for(let chat of this.chats){
      if(chat.id == this.user.id){
        this.chatId = chat.idChat;
        this.isChat =true;
      } else {
        this.isChat = false;
      }}
  }

  checkMe(){
    if(this.tour.buddy == this.userInfo.id){
      this.isMe = true;
    } else {
      this.isMe = false;
    }
  }

  startChat(){
    this.chat.startChat(this.userInfo.id, this.user.id).then(
      (data) => {
        this.navToChat();
      }
    );

  }

  navToChat(){
    this.navCtrl.push(ChatPage, this.chatId);
  }
}
