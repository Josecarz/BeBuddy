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
import {ChatPage} from "../chat/chat";
import {ChatService} from "../../providers/chat-service";
import {FinalChat} from "../../models/models";

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
  chats: any;
  // finalChats: FinalChat = {img: '', idChat: '', name: ''};
  finalChats: any[]=[];
  arrayChat = [];
  lock: boolean = true;
  promise: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fav: FavouritesService,
              public storage: Storage,
              private dbapi: DbApiService,
              private rating: RatingService,
              private profile: UserService,
              private auth: AngularFireAuth,
              private dataService: DataProvider,
              private chat: ChatService) {
  }

  ionViewWillEnter() {
    this.followChat = "Seguidos";

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;

            this.dbapi.getFollows(this.userInfo.id).subscribe(
              (data) => {
                this.follows = data;
              }
            );

            let x = this.chat.getChats(this.userInfo.id).subscribe(
              (data) => {
                this.chats = data;
                this.loadChats();
                x.unsubscribe();
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

  loadChats() {
    console.log("LOAD CHATS")

    this.finalChats = [];
    if(this.chats) {
      for (let chat of this.chats) {
        this.profile.getUserProfileInfo(chat.id).subscribe(
          (data) => {
            this.finalChats.push({
              idChat: chat.idChat,
              infoUser: data
            });
            console.log(chat.idChat)
          });
      }
      console.log(4, this.finalChats)

    }
  }

  navToChat(chatId){
    this.navCtrl.push(ChatPage, chatId);
  }

  deleteChat(chat){


    console.log(1, this.finalChats);


    const index = this.finalChats.indexOf(chat);
    console.log(index)
    this.finalChats.splice(index, 1);

    console.log(2, this.finalChats);

    this.chat.deleteChat(chat.idChat, this.userInfo.id);
    // this.lock = true;
  }

}
