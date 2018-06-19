import { Component } from '@angular/core';
import {
  AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {RegisterPage} from "../register/register";
import {HomePage} from "../home/home";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import * as firebase from "firebase";
import {Login} from "../../models/models";
import {UserService} from "../../providers/user-service";

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
  usuario = {};

  constructor(public navCtrl: NavController, private profile: UserService, private loadingCtrl: LoadingController, private auth: AngularFireAuth) {
  }

  ionWiewDidLoad(){
    this.auth.authState.subscribe(data => {
      this.usuario = data;
    });
  }

  login(): void {
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento...' });
    this.loader.present();
    this.profile.userLogin(this.userLogin.email, this.userLogin.password)
      .then(() => {
        this.loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        this.loader.dismiss();
      })
  }

  logout(){
    this.profile.userLogout();
  }

  SignUp(): void {
    this.navCtrl.push(RegisterPage);
  }

}
