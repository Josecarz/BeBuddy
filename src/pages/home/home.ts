import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DbApiService} from "../../shared/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";
import {FormControl} from "@angular/forms";
import {DataProvider} from "../../shared/data";
import {TripdetailPage} from "../tripdetail/tripdetail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recipes = [];
  usuario = {};
  user: string = '';

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private dataService: DataProvider,
              // private socialsharing: SocialSharing
              ) {
    this.searchControl = new FormControl();


  }

  ionViewDidLoad() {

    this.dbapi.getDestino().subscribe(
      (data) => {
        this.recipes = data;
        console.log(this.recipes);
        this.setFilteredItems();
      }
    );
    console.log('SADFJGFJKSDAGLFJKDSAGF' + this.recipes);

    this.setFilteredItems();
    this.searchControl.valueChanges.subscribe(search  => {
      this.searching = true;
      this.setFilteredItems();
    });
  }

  onSearchInput(){
    this.searching = false;
  }

  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm, this.recipes);
  }

  navTrip(destino){
    console.log('SADFJGFJKSDAGLFJKDSAGF' + destino);
    this.navCtrl.push(TripdetailPage, {'destino': destino});
  }
}

