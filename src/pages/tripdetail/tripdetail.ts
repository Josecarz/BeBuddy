import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import { Storage } from '@ionic/storage';
import {FavouritesService} from "../../providers/favourites-service";
import {RatingService} from "../../providers/rating-service";

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
  favourite: boolean;
  lock: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private fav: FavouritesService,  public storage: Storage, private dbapi: DbApiService, private rating: RatingService) {
    this.tour = this.navParams.data;
    // console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad TripdetailPage' + this.tour.id);
    this.fav.isFav(this.tour.id).then(value => this.favourite = value);

  }

  ionViewWillLoad(){
    this.fav.isFav(this.tour);
  }

  changeFollow(tour){
    this.favourite = !this.favourite;

    if(this.favourite)
      this.fav.favoriteTour(tour)
    else
      this.fav.unfavoriteTour(tour);
  }

  rate($event, tour){
    this.rating.onModelChange($event, tour, 'tour');
  }

}
