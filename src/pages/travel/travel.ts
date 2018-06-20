import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  myTours = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TravelPage');
  // }

  ionViewWillLoad(){
    this.storage.forEach( (value, key, index) => {
      this.myTours.push(value);
    })
  }


}
