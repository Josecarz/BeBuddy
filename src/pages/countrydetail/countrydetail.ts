import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {CitydetailPage} from "../citydetail/citydetail";

/**
 * Generated class for the CountrydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-countrydetail',
  templateUrl: 'countrydetail.html',
})
export class CountrydetailPage {

  destino: any;
  cities = [];
  infoCity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService) {
    this.destino = this.navParams.data;
    console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountrydetailPage' + this.destino.id);


    this.dbapi.getCities(this.destino.id).subscribe(
      (data) => {
        this.cities = data;
      }
    );

  }

  navCity(city){
    this.dbapi.getInfoCity(city.id).subscribe(
      (data) => {
        this.infoCity = data;
        console.log('ionViewDidLoad INFOCITY' + this.infoCity);
        this.navCtrl.push(CitydetailPage, this.infoCity);
      }
    );

  }

}
