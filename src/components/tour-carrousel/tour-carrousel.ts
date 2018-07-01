import {Component, Input} from '@angular/core';
import {TourService} from "../../providers/tour-service";
import {ToursPage} from "../../pages/tours/tours";
import {TripdetailPage} from "../../pages/tripdetail/tripdetail";
import {NavController} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";
import {DataProvider} from "../../providers/data";
import {CitydetailPage} from "../../pages/citydetail/citydetail";
import {DbApiService} from "../../providers/db-api.service";
import {LoginPage} from "../../pages/login/login";
import {PerfilPage} from "../../pages/perfil/perfil";

/**
 * Generated class for the TourCarrouselComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tour-carrousel',
  templateUrl: 'tour-carrousel.html'
})
export class TourCarrouselComponent {

  text: string;
  tours: any;

  usuario: any;
  userInfo: any;
  city: any;
  toursCity: any;
  buddy: any;
  infoCity: any;

  @Input() name;
  @Input() from;
  @Input() param;

  constructor(public navCtrl: NavController,    private auth: AngularFireAuth,
              private profile: UserService,  private tourService: TourService, private dataService: DataProvider,
              private dbapi: DbApiService,) {
    console.log('Hello TourCarrouselComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    this.start();
  }

  start(){
    // this.infoCity = this.param;
    // console.log(this.infoCity)
    this.tourService.getTours().subscribe(
      (data) => {
        this.tours = data;
      }
    );

    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.city);
            this.profile.getCity(this.userInfo.city).subscribe(
              data =>{
              this.city = data;
              this.setFilteredTourItems(this.city.id);
              });
          }
        );
      }
    });

    this.dbapi.getBuddies().subscribe(
      (data) => {
        this.buddy = data;
        console.log(this.buddy);
        if (this.param!=null)
          this.setFilteredBuddiesItems();
      }
    );
  }

  navTours(){
    this.navCtrl.push(ToursPage);
  }

  navTour(tour){
    this.navCtrl.push(TripdetailPage, tour);
  }

  navCity(city){
        this.navCtrl.push(CitydetailPage, city);

  }

  navUser(user){
    console.log(user);
    this.navCtrl.push(PerfilPage, user);
  }

  navMiPerfil(){
    this.navCtrl.push(LoginPage);
  }

  setFilteredTourItems(city) {
    console.log("FILTERITEMS")
    this.toursCity = this.dataService.filterByCity(city, this.tours);
  }

  setFilteredBuddiesItems() {
    console.log("FILTERITEMS")
    this.buddy = this.dataService.filterByCity(this.param, this.buddy);
    // console.log(this.buddies);
  }
}
