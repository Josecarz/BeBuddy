import { Component } from '@angular/core';
import { ActionSheetController, NavController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Tour } from '../../models/models';
import {CameraService} from "../../providers/camera-service";
import {TourService} from "../../providers/tour-service";
import {UserService} from "../../providers/user-service";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  selector: 'create-tour',
  templateUrl: 'create-tour.html'
})
export class CreateTourComponent {

  imageSrc: string;
  imageUploaded: boolean;
  tour: Tour;
  now: number;
  dateString: string;
  loader: Loading;
  autocomplete: any;
  usuario: any;
  userInfo: any;

  constructor(
    private navCtrl: NavController,
    private actionSheet: ActionSheetController,
    private db: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private cam: CameraService,
    private tourService: TourService,
    private userService: UserService,
    private auth: AngularFireAuth
  ) {
    this.dateString = '';
    this.tour = {
      title: '',
      description: '',
      image: '',
      date: 0,
      days: [''],
      buddy: '',
      city: '',
      time: '',
    }

    ;
    this.imageUploaded = false;
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento' });
  }


  ionViewWillEnter(){
    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIO   " + this.usuario.uid);
        this.userService.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.name);
          }
        );
      }
    });



  }


  closePage() {
    this.navCtrl.pop();
  }

  selectImage() {
    this.cam.getImage().then(imageData => {
      this.tour.image = imageData;
      this.imageSrc = imageData;
      this.imageUploaded = true;
    })
      .catch(err => console.log(err));
  }



  createTour() {
    this.tour.buddy = this.userInfo.id;
    this.tour.city = this.userInfo.city;
    this.loader.present();
    this.tourService.createTour(this.tour)
      .then(() => {
        this.loader.dismiss();
        this.navCtrl.pop();
        // this.toast.eventCreated();
      })
      .catch(err => console.log(err));
  }


}
