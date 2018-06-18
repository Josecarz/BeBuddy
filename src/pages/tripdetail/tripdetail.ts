import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";

/**
 * Generated class for the TripdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tripdetail',
  templateUrl: 'tripdetail.html',
})
export class TripdetailPage {

  tour: any;
  cities = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService,) {
    this.tour = this.navParams.data;
    // console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripdetailPage' + this.tour.id);




  }

}
