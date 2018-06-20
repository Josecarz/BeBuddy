import { Component } from '@angular/core';
import {
  AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {RegisterPage} from "../register/register";
import {Login, UserInfo} from "../../models/models";
import {UserService} from "../../providers/user-service";
import {DbApiService} from "../../providers/db-api.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  userLogin: Login = { email: '', password: '' };
  loader: Loading;
  usuario: any;
  // userInfo: UserInfo = { id: '', name: '', email: '', img: '', role: ''}
  userInfo: any;
  constructor(public navCtrl: NavController, private dbapi: DbApiService,  private profile: UserService, private loadingCtrl: LoadingController, private auth: AngularFireAuth) {
  }

  ionViewDidLoad(){
    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.name);
          }
        );
      }
    });



  }

  login(): void {
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento...' });
    this.loader.present();
    this.profile.userLogin(this.userLogin.email, this.userLogin.password)
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
        this.loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        this.loader.dismiss();
      })

  }

  logout(){
    this.profile.userLogout();
    this.navCtrl.setRoot(LoginPage);
  }

  SignUp(): void {
    this.navCtrl.push(RegisterPage);
  }

}
