import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {TripdetailPage} from "../tripdetail/tripdetail";
import {DataProvider} from "../../providers/data";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService,  private dataService: DataProvider) {
    this.infoCity = this.navParams.data;
    this.param = this.infoCity.id;
    console.log(this.infoCity);
  }

  ionViewDidLoad() {
    this.dbapi.getTours().subscribe(
      (data) => {
        this.tours = data;
        console.log(this.tours);
        this.setFilteredItems()
      }
    );

    this.dbapi.getBuddies().subscribe(
      (data) => {
        this.buddy = data;
        console.log(this.buddy);
        this.setFilteredItems()
      }
    );
  }

  setFilteredItems() {
    this.finalTours = this.dataService.filterByCity(this.param, this.tours);


    this.buddies = this.dataService.filterByCityBuddy(this.param, this.buddy);
    console.log(this.buddies);
  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }

}
