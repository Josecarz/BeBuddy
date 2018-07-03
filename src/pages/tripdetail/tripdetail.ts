import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import { Storage } from '@ionic/storage';
import {RatingService} from "../../providers/rating-service";
import {CommentsComponent} from "../../components/comments/comments";
import {UserService} from "../../providers/user-service";
import {AngularFireAuth} from "angularfire2/auth";
import {Follow} from "../../models/models";
import {ChatService} from "../../providers/chat-service";
import {ChatPage} from "../chat/chat";
import {TourService} from "../../providers/tour-service";

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
  lock: any;
  user: any;
  flag: false;
  usuario: any;
  userInfo: any;
  followUser: Follow = { id: '', name: '', img:'' };
  follows: any
  followTour: any;
  isFollow: boolean;
  isFollowTour: boolean;
  isChat: boolean;
  isMe: boolean;
  chats: any;
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  chatId: string;
  miDays: any[]=[];
  miHours: any[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private rating: RatingService,
              private profile: UserService,
              private auth: AngularFireAuth,
              private chat: ChatService,
              private tourapi: TourService) {
    this.tour = this.navParams.data;
    console.log(this.tour.days)
  }

  ionViewWillEnter() {
    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log(this.userInfo)
            this.dbapi.getFollows(this.userInfo.id).subscribe(
              (data) => {
                this.follows = data;
                this.checkFollow();
                this.checkMe();
              }
            );
            this.dbapi.getFollowsTour(this.userInfo.id).subscribe(
              (data) => {
                this.followTour = data;
                console.log(this.followTour)
                this.checkFollow();
                // this.checkMe();
              }
            );
            this.chat.getChats(this.userInfo.id).subscribe(
              (data) => {
                this.chats = data;
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

    for(let day of this.tour.days){
      this.miDays.push(day.day);
      this.miHours.push(day.hour)
    }

  }

  changeFollow(){
    if(this.isFollowTour){
      this.tour.follows = this.tour.follows -1 ;
      this.tourapi.deleteTourToFollow(this.tour, this.userInfo.id, this.tour.follows);
      console.log("DEJAR DE SEGUIR")
    } else {
      this.tour.follows = this.tour.follows +1 ;
      this.tourapi.addTourToFollow(this.tour, this.userInfo.id, this.tour.follows);
      console.log("SEGUIR")
    }
  }

  rate($event, tour){
    this.rating.onModelChange($event, tour, 'tour');
  }

  navComment(tour){
    this.navCtrl.push(CommentsComponent, {'tour': tour, 'usuario': this.user, 'from': 'tour'});
  }


  follow(user){
    console.log(user.id);
    this.followUser.id = user.id;
    this.followUser.name = user.name;
    this.followUser.img = user.img;
    console.log(this.followUser.id);
    this.profile.addUserToFollow(this.userInfo.id, this.followUser);
    this.isFollow= true;
  }


  unfollow(user){
    this.profile.deleteUserToFollow(this.userInfo.id, user.id);
    this.isFollow = false;
  }

  checkFollow(){
    this.isFollow= this.follows.find((follow)=>follow.id ==this.user.id);
    this.isFollowTour= this.followTour.find((follow)=>follow.id ==this.tour.id);
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

  deleteTour(){
    this.tourapi.deleteTour(this.tour.id)
  }
}
