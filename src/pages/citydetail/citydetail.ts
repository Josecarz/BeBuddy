import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {TripdetailPage} from "../tripdetail/tripdetail";

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
  tours: any;
  lock: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService) {
    this.infoCity = this.navParams.data;
    console.log(this.infoCity);
  }

  ionViewDidLoad() {
    this.dbapi.getTours().subscribe(
      (data) => {
        this.tours = data;
        console.log(this.tours);

      }
    );

  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }


  onModelChange($event, tour){
    if(!tour.votes){
      tour.votes = 1;
      tour.points = tour.rate;
      tour.rate = tour.rate;
    }else{
      tour.votes++;
      tour.points += tour.rate;
      tour.rate = tour.points/tour.votes;

    }
    this.lock=true;
    //hay que subirlo a firebase
    this.dbapi.pushTour(tour);
    // this.dbapi.pushRecipe(recipe);
  }

}
