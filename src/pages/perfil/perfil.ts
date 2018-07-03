import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RatingService} from "../../providers/rating-service";
import {DbApiService} from "../../providers/db-api.service";
import {Follow, Login, Rating} from "../../models/models";
import {UserService} from "../../providers/user-service";
import {AngularFireAuth} from "angularfire2/auth";
import {DataProvider} from "../../providers/data";
import {ChatPage} from "../chat/chat";
import {ChatService} from "../../providers/chat-service";
import {CommentsComponent} from "../../components/comments/comments";

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
  chatId: string;
  isChat: boolean;
  chats: any;

  constructor(public navCtrl: NavController, private dbapi: DbApiService,  private profile: UserService, private loadingCtrl: LoadingController, private auth: AngularFireAuth,
              private rating: RatingService, public navParams: NavParams, private dataService: DataProvider, private chat: ChatService) {
    this.buddy = this.navParams.data;
    console.log(1, this.buddy)
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
            this.chat.getChats(this.userInfo.id).subscribe(
              (data) => {
                this.chats = data;
                console.log(this.chats);
                this.checkChat();
              }
            );
          }
        );
        this.profile.getUserRatingInfo(this.buddy.profile.id).subscribe(
          (data) => {
            this.ratingInfo = data;
            if(this.ratingInfo == null){
              this.profile.addRatingToUser(this.buddy.profile.id, this.ratingUser);
            }
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
    // for(let follow of this.follows){
    //   console.log(follow.id)
    //   console.log(this.buddy.profile.id)
    //   if(follow.id === this.buddy.profile.id){
    //     this.isFollow =true;
    //   } else {
    //     this.isFollow = false;
    this.isFollow= this.follows.find((follow)=>follow.id ==this.buddy.profile.id)
  }




  checkChat(){
    for(let chat of this.chats){
      if(chat.id == this.buddyFinal.id){
        this.chatId = chat.idChat;
        this.isChat =true;
      } else {
        this.isChat = false;
      }}
  }

  navToChat(){
    this.navCtrl.push(ChatPage, this.chatId);
  }

  startChat(user){
    this.chat.startChat(this.userInfo.id, user.profile.id)
  }
  navComment(user){
    this.navCtrl.push(CommentsComponent, {'usuario': user});
  }

}
