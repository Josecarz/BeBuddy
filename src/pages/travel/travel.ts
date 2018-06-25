import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FavouritesService} from "../../providers/favourites-service";
import {DbApiService} from "../../providers/db-api.service";
import {TripdetailPage} from "../tripdetail/tripdetail";

/**
 * Generated class for the TravelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-travel',
  templateUrl: 'travel.html',
})
export class TravelPage {

  favourites = [];
  buddy: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbapi: DbApiService,
              public storage: Storage,  private fav: FavouritesService, private events: Events) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
    this.favourites = this.fav.getAllFavourites();
    this.events.subscribe('favourites:changed',(item)=>
      this.favourites=this.fav.getAllFavourites());

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
