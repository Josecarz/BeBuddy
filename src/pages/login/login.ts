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

  myForm: FormGroup;
  user = {} as User;
  usuario = {};
  public loading: Loading;
  user1: any;
  userData: any;
  public email: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast : ToastController,
              public formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      // console.log(data.email);
      if (data && data.email && data.uid) {

        this.toast.create({
          message: `Welcome to GC_Diet, ${data.email}`,
          duration: 3000
        }).present();
      }
    });

    this.user1 = firebase.auth().currentUser;
    console.log("Emai,,,,,,,,,,,,l:" + this.user1.email);
    if (this.user1 != null) {
    //   name =  this.user1.displayName;
      this.userData.email =  this.user1.email;
    //   photoUrl =  this.user1.photoURL;
    //   emailVerified =  this.user1.emailVerified;
    //   uid =  this.user1.uid;
    }
  }

  login(user: User) {

    console.log("Email:" + user.email);
    console.log("Password:" + user.password);

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
      this.navCtrl.push(HomePage);
    }, (err) => {
      this.loading.dismiss().then( ()=>{
        let alert = this.alertCtrl.create({
          message: err.message,
          buttons: [
            {
              text: "OK",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }


  logout() {
    this.afAuth.auth.signOut();

  }

  SignUp() {
    this.navCtrl.push(RegisterPage);
  }

}
