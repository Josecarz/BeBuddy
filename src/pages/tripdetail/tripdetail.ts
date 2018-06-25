import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import { Storage } from '@ionic/storage';
import {FavouritesService} from "../../providers/favourites-service";
import {RatingService} from "../../providers/rating-service";
import {CommentsComponent} from "../../components/comments/comments";

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
  user: any;
  flag: false;
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fav: FavouritesService,
              public storage: Storage,
              private dbapi: DbApiService,
              private rating: RatingService) {
    this.tour = this.navParams.data;
    // console.log('ionViewDidLoad ' + this.destino);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad TripdetailPage' + this.tour.id);
    this.fav.isFav(this.tour.id).then(value => this.favourite = value);

    //Necesitamos la información del usuario que creo el tour
    this.dbapi.getInfoUserTour(this.tour.buddy).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      }
    );
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

  navComment(tour){
    this.navCtrl.push(CommentsComponent, {'tour': tour, 'usuario': this.user});
  }


}
