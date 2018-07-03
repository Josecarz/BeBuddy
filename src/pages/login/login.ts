import { Component } from '@angular/core';
import {
  AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {RegisterPage} from "../register/register";
import {Login, NewUser, Rating, UserInfo} from "../../models/models";
import {UserService} from "../../providers/user-service";
import {DbApiService} from "../../providers/db-api.service";
import {EditPerfilComponent} from "../../components/edit-perfil/edit-perfil";
import {RatingService} from "../../providers/rating-service";
import {CreateTourComponent} from "../../components/create-tour/create-tour";
import {CommentsComponent} from "../../components/comments/comments";
import {HomePage} from "../home/home";
import {DataProvider} from "../../providers/data";

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
  ratingInfo: any;
  lock: any;
  tours: any;
  finalTours: any;
  ratingUser: Rating = { rate: 0, votes: 0, points: 0 };
  constructor(public navCtrl: NavController, private dbapi: DbApiService,  private profile: UserService, private loadingCtrl: LoadingController, private auth: AngularFireAuth,
              private rating: RatingService, private dataService: DataProvider) {
  }

  ionViewWillEnter(){
    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log(1, this.userInfo);

          }
        );
        this.profile.getUserRatingInfo(this.usuario.uid).subscribe(
          (data) => {
            this.ratingInfo = data;
            if(this.ratingInfo == null){
              this.profile.addRatingToUser(this.usuario.uid, this.ratingUser);
            }
            console.log("RATING " + this.ratingInfo)
          }
        );
        this.dbapi.getTours().subscribe(
          (data) => {
            this.tours = data;
            this.finalTours = this.dataService.filterByBuddy(this.userInfo.id, this.tours);
            //filtrar por mi id=buddy
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
    this.navCtrl.setRoot(HomePage);
  }

  SignUp(): void {
    this.navCtrl.push(RegisterPage);
  }

  navEdit(){
    this.navCtrl.push(EditPerfilComponent, this.userInfo);
  }

  rate($event, rating){
    rating.id = this.userInfo.id;
    this.rating.onModelChange($event, rating, 'user');
  }

  navCreate(){
    this.navCtrl.push(CreateTourComponent);
  }

  navComment(user){
    console.log(user)
    this.navCtrl.push(CommentsComponent, {'usuario': this.userInfo, 'from': 'user'});
  }
}
