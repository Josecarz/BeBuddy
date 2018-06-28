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
  finalChats: FinalChat = {img: '', idChat: '', name: ''};
  arrayChat = [];
  lock: boolean = true;

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

            this.chat.getChats(this.userInfo.id).subscribe(
              (data) => {
                this.chats = data;
                console.log(this.chats);
                this.loadChats();
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
    if (this.lock) {
      this.lock = false;
      for (let chat of this.chats) {

        this.finalChats.idChat = chat.idChat;
        console.log(this.finalChats)
        this.profile.getUserProfileInfo(chat.id).subscribe(
          (data) => {
            console.log(data)
            this.finalChats.img = data.img;
            this.finalChats.name = data.name;
            this.arrayChat.push(this.finalChats);
            console.log(this.finalChats)
          }
        )
      }
    }
  }

  navToChat(chatId){
    this.navCtrl.push(ChatPage, chatId);
  }

  deleteChat(chatId){
    console.log(chatId);
    let contador = 0;
    /*for (let chat of this.arrayChat){
      contador ++;
      if (chat.idChat==chatId){
        this.arrayChat.pop(22);
      }
    }*/
    this.chat.deleteChat(chatId);
  }

}
