import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService) {
    this.infoCity = this.navParams.data;
    console.log(this.infoCity);
  }

  // ionViewDidLoad() {
  //   // this.dbapi.getInfoCity(this.city.id).subscribe(
  //   //   (data) => {
  //   //     this.infoCity = data;
  //   //     console.log('ionViewDidLoad INFOCITY' + this.infoCity);
  //   //   }
  //   // );
  //
  // }


}
