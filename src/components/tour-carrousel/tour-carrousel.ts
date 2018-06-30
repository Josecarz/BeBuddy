import {Component, Input} from '@angular/core';
import {TourService} from "../../providers/tour-service";
import {ToursPage} from "../../pages/tours/tours";
import {TripdetailPage} from "../../pages/tripdetail/tripdetail";
import {NavController} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";
import {DataProvider} from "../../providers/data";
import {CitydetailPage} from "../../pages/citydetail/citydetail";

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

  from: string;
  usuario: any;
  userInfo: any;
  city: any;
  toursCity: any;

  @Input() name;

  constructor(public navCtrl: NavController,    private auth: AngularFireAuth,
              private profile: UserService,  private tourService: TourService, private dataService: DataProvider) {
    console.log('Hello TourCarrouselComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    this.start();
  }

  start(){
    this.from = this.name;
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

  setFilteredTourItems(city) {
    console.log("FILTERITEMS")
    this.toursCity = this.dataService.filterByCity(city, this.tours);
  }

}
