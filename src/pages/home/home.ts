import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {DbApiService} from "../../providers/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";
import {FormControl} from "@angular/forms";
import {DataProvider} from "../../providers/data";
import {TripdetailPage} from "../tripdetail/tripdetail";
import {CountrydetailPage} from "../countrydetail/countrydetail";
import {UserService} from "../../providers/user-service";
import {ToursPage} from "../tours/tours";
import {TourService} from "../../providers/tour-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sites = [];
  sites2=[];
  usuario = {};
  cities =[];
  tours = [];
  user: string = '';
  finalTours = [];

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;
  userInfo: any;
  follows: any;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              private toast : ToastController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private dataService: DataProvider,
              private profile: UserService,
              private tourService: TourService,
              ) {
    this.searchControl = new FormControl();


  }

  ionViewDidLoad() {

    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      // console.log(data.email);
      if (data && data.email && data.uid) {

        this.toast.create({
          message: `Welcome to Bebuddy, ${data.email}`,
          duration: 1500
        }).present();

        this.dbapi.getFollows(data.uid).subscribe(
          (data) => {
            this.follows = data;
            for(let follow of this.follows){

            }
          }
        );
      }
    });

    this.dbapi.getCountry().subscribe(
      (data) => {
        this.sites = data;
        console.log(this.sites);
        this.setFilteredItems();
      }
    );
    this.dbapi.getCity().subscribe(
      (data) => {
        this.sites2 = data;
        console.log(this.sites2);
        this.setFilteredItems();
      }
    );



    this.tourService.getTours().subscribe(
      (data) => {
        this.tours = data;
      }
    );

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
    let possibleItems = [].concat(this.sites).concat(this.sites2);
    this.items = this.dataService.filterItems(this.searchTerm, possibleItems);
  }

  navTrip(destino){
    this.dbapi.getCities(destino.id).subscribe(
      (data) => {
        this.cities = data;
        console.log(this.cities);
        this.setFilteredItems();
      }
    );
    this.navCtrl.push(CountrydetailPage, destino);
  }

  navTours(){
    this.navCtrl.push(ToursPage);
  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }
}

