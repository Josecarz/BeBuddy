import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatService} from "../../providers/chat-service";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chatId: string;
  usuario: any;
  userInfo: any;
  message = '';
  messages: object[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private profile: UserService, private auth: AngularFireAuth, private chat: ChatService) {
    this.chatId = this.navParams.data;
    console.log(this.chatId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
          }
        );

        this.chat.getMessages(this.chatId).subscribe(
          (data) =>{
            this.messages = data;
          }
        )

      }
    });
  }

  sendMessage(){
    this.chat.sendMessage(this.chatId, this.message, this.userInfo.id);
    this.message = '';
  }


}
