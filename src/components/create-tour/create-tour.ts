import { Component } from '@angular/core';
import { ActionSheetController, NavController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../../models/models';
import {CameraService} from "../../providers/camera-service";


@Component({
  selector: 'create-tour',
  templateUrl: 'create-tour.html'
})
export class CreateTourComponent {

  imageSrc: string;
  imageUploaded: boolean;
  event: Event;
  now: number;
  dateString: string;
  loader: Loading;
  autocomplete: any;

  constructor(
    private navCtrl: NavController,
    private actionSheet: ActionSheetController,
    private db: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private cam: CameraService
  ) {
    this.dateString = '';
    this.event = {
      title: '',
      description: '',
      image: '',
      date: 0,
      days: ['']
    }

    ;
    this.imageUploaded = false;
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento' });
  }



  ionViewDidEnter() {

  }


  closePage() {
    this.navCtrl.pop();
  }

  selectImage() {
    this.cam.getImage().then(imageData => {
      this.event.image = imageData;
      this.imageSrc = imageData;
      this.imageUploaded = true;
    })
      .catch(err => console.log(err));
  }



  // createEvent() {
  //   this.loader.present();
  //   this.eventsProvider.createEvent(this.event)
  //     .then(() => {
  //       this.loader.dismiss();
  //       this.navCtrl.pop();
  //       this.toast.eventCreated();
  //     })
  //     .catch(err => console.log(err));
  // }


}
