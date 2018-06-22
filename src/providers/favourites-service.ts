import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import {NewUser, UserInfo} from "../models/models";
import {Observable} from "rxjs/Observable";
import {Events} from "ionic-angular";


@Injectable()
export class FavouritesService {

  favorite: boolean;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth,  public storage: Storage, private events: Events) {
  }

  favoriteTour(tour){
    // this.storage.set(tour.id.toString(), tour);
    // this.favorite=true;
    // this.getFavorite(tour);
    this.storage.set(tour.id.toString(), tour).then(
      ()=> this.events.publish('favourites:changed'));
  }

  unfavoriteTour(tour){
    // this.storage.remove(tour.id.toString());
    // this.favorite=false;
    // this.getFavorite(tour);
    this.storage.remove(tour.id.toString()).then(
      ()=> this.events.publish('favourites:changed'));
  }

  // getFavorite(tour){
  //   this.storage.get(tour.id.toString()).then((val) => {
  //     console.log("value is: " , val);
  //   });
  //   console.log(tour);
  // }

  isFav(tour) {

    return this.storage.get(tour.toString()).then(value => value ? true : false);
  }

  getAllFavourites() {
    let item = [];
    this.storage.forEach((value, key, index)=>
    {
      item.push(value);
    });
    return item;
  }

}
