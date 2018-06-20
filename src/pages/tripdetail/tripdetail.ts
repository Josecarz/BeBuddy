import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import { Storage } from '@ionic/storage';

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
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService,  public storage: Storage) {
    this.tour = this.navParams.data;
    // console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripdetailPage' + this.tour.id);

  }

  ionViewWillLoad(){
    this.isFav(this.tour);
  }

  favoriteTour(tour){
    this.storage.set(tour.id.toString(), tour);
    this.favorite=true;
    this.getFavorite(tour);
  }

  unfavoriteTour(tour){
    this.storage.remove(tour.id.toString());
    this.favorite=false;
    this.getFavorite(tour);
  }

  getFavorite(tour){
    this.storage.get(tour.id.toString()).then((val) => {
      console.log("value is: " , val);
    });
    console.log(tour);
  }

  isFav(tour) {
    this.storage.get(tour.id.toString()).then((value) => {
      value ? this.favorite = true : this.favorite = false
    }).catch(() => this.favorite = false);
  }

}
