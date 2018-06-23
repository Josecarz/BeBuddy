import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';

@Injectable()
export class CameraService {

  constructor(private camera: Camera, private actionSheet: ActionSheetController) {
  }

  public getImage(): Promise<any> {
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheet.create({
        title: 'Elija la fuente',
        buttons: [
          {
            text: 'Cámara',
            handler: () => {
              const options: CameraOptions = {
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                targetWidth: 480,
                correctOrientation: true
              };
              this.camera.getPicture(options).then((imageData) => {
                imageData = 'data:image/jpeg;base64,' + imageData;
                resolve(imageData);
              }, (err) => reject(err));
            }
          },
          {
            text: 'Galería',
            handler: () => {
              const options: CameraOptions = {
                sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                targetWidth: 480,
                correctOrientation: true
              };
              this.camera.getPicture(options).then((imageData) => {
                imageData = 'data:image/jpeg;base64,' + imageData;
                resolve(imageData);
              }, (err) => reject(err));
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => reject()
          }
        ]
      });
      actionSheet.present();
    });
  }

}
