import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {UserService} from "../../providers/user-service";
import {TourService} from "../../providers/tour-service";
import {TripdetailPage} from "../tripdetail/tripdetail";
import {PerfilPage} from "../perfil/perfil";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ToursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tours',
  templateUrl: 'tours.html',
})
export class ToursPage {

  tours: any;
  buddy: any;
  usuario: any;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbapi: DbApiService,  private tourService: TourService,
              private auth: AngularFireAuth,
              private profile: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToursPage');
    this.tourService.getTours().subscribe(
      (data) => {
        this.tours = data;
        console.log(this.tours);
      }
    );


    this.dbapi.getBuddies().subscribe(
      (data) => {
        this.buddy = data;
        console.log(this.buddy);
      }
    );

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.id);

          }
        );
      }
    });

  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }

  navUser(user){
    console.log(user);
    this.navCtrl.push(PerfilPage, user);
  }

  navMiPerfil(){
    this.navCtrl.push(LoginPage);
  }

}
