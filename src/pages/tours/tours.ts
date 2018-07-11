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
              ) {
  }
  //


}
