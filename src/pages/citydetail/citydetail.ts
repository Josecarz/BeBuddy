import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {TripdetailPage} from "../tripdetail/tripdetail";
import {DataProvider} from "../../providers/data";
import {TourService} from "../../providers/tour-service";
import {PerfilPage} from "../perfil/perfil";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";
import {LoginPage} from "../login/login";

/**
 * Generated class for the CitydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-citydetail',
  templateUrl: 'citydetail.html',
})
export class CitydetailPage {

  // city: any;
  infoCity: any;
  tours = [];
  buddy = [];
  finalTours: any;
  finalBuddies: any;
  lock: any;
  param: '';
  city: string ='';
  buddies: any;
  usuario: any;
  userInfo: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private dataService: DataProvider,
              private tourService: TourService,
              private auth: AngularFireAuth,
              private profile: UserService) {
    this.infoCity = this.navParams.data;
    this.param = this.infoCity.id;
    console.log(this.infoCity);
  }

  ionViewDidLoad() {
    this.tourService.getTours().subscribe(
      (data) => {
        this.tours = data;
        console.log(this.tours);
        this.setFilteredTourItems()
      }
    );

    this.dbapi.getBuddies().subscribe(
      (data) => {
        this.buddy = data;
        console.log(this.buddy);
        this.setFilteredBuddiesItems();
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

  setFilteredTourItems() {
    console.log("FILTERITEMS")
    this.finalTours = this.dataService.filterByCity(this.param, this.tours);

  }

  setFilteredBuddiesItems() {
    console.log("FILTERITEMS")
    this.buddies = this.dataService.filterByCity(this.param, this.buddy);
    console.log(this.buddies);
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
