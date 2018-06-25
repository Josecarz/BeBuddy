import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {UserService} from "../../providers/user-service";
import {TourService} from "../../providers/tour-service";
import {TripdetailPage} from "../tripdetail/tripdetail";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbapi: DbApiService,  private tourService: TourService) {
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

  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }

}
