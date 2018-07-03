import {Component, Input} from '@angular/core';
import {DbApiService} from "../../providers/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";
import {NavController, NavParams} from "ionic-angular";
import {TourService} from "../../providers/tour-service";
import {TripdetailPage} from "../../pages/tripdetail/tripdetail";
import {PerfilPage} from "../../pages/perfil/perfil";
import {LoginPage} from "../../pages/login/login";
import {DataProvider} from "../../providers/data";
import * as _ from 'lodash';


/**
 * Generated class for the TourComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tour',
  templateUrl: 'tour.html'
})
export class TourComponent {

  text: string;
  tours: any;
  buddy: any;
  usuario: any;
  userInfo: any;
  finalTours: any;
  buddies: any;
  order: string;

  @Input() nombre;
  @Input() param;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbapi: DbApiService,  private tourService: TourService,
              private auth: AngularFireAuth,
              private profile: UserService,  private dataService: DataProvider) {
  }

  ngOnInit(){
    this.start();
    console.log(this.nombre);
    console.log(this.order);
  }

  start(){
    this.tourService.getTours().subscribe(
      (data) => {
        this.tours = data;
        console.log(this.tours);

        if(this.nombre=="city")
          this.setFilteredTourItems()
        if(this.nombre=='perfil')
          this.setFilterTourByUser()

      }
    );

    this.dbapi.getBuddies().subscribe(
      (data) => {
        this.buddy = data;
        console.log(data);

        if(this.nombre=="city")
          this.setFilteredBuddiesItems();

      }
    );

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.id);

          }
        );
      }
    });
  }

  setFilteredTourItems() {
    console.log("FILTERITEMS")
    this.tours = this.dataService.filterByCity(this.param, this.tours);

  }

  setFilteredBuddiesItems() {
    console.log("FILTERITEMS")
    this.buddies = this.dataService.filterByCity(this.param, this.buddy);
    console.log(this.buddies);
  }

  setFilterTourByUser(){
    this.tours = this.dataService.filterByBuddy(this.param, this.tours);
  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }

  navUser(user){
    console.log(user);
    this.navCtrl.push(PerfilPage, user);
  }

  navMiPerfil(){
    this.navCtrl.push(LoginPage);
  }

  orderByRate(){
    this.tours = _.orderBy(this.tours, 'name', 'asc');

  }

  checkSelect(){
    console.log(this.order)
  // this.ngOnInit();



    if(this.order=="Mejor valorados")
      this.tours = _.orderBy(this.tours, 'votes', 'asc');
      console.log(this.tours);
  }

}
