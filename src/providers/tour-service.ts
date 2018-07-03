
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import {Tour} from "../models/models";



@Injectable()
export class TourService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {

  }

  public getTours(): Observable<Tour[]> {
    return this.db.list(`/tours`)
      .valueChanges().map(tours => tours.reverse()) as Observable<Tour[]>
  }

  public createTour(tour: Tour): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.list(`/tours`).push({}).then(success => {
        this.storage.ref(`/tours/${success.key}.jpg`).putString(tour.image, 'data_url').then(snapshot => {
          this.db.object(`/tours/${success.key}`).set({
            title: tour.title,
            description: tour.description,
            id: success.key,
            img: snapshot.downloadURL,
            days: tour.days,
            time: tour.time,
            buddy: tour.buddy,
            city: tour.city,
            comments: new Array(""),
          }).then(snapshot=>{
            this.addTourToCity(tour, success.key);
          }).then(() => resolve())
            .catch(err => reject(err.code));
        })
          .catch(err => reject(err.code));
      }, err => reject(err.code));
    });
  }


  public addTourToCity(tour: Tour, id) {
    this.db.object(`cities/${tour.city}/tours/${id}`).set(id);

  }

  public deleteTour(tourId: string){
    this.db.object(`tours/${tourId}`).remove();
  }

  public addTourToFollow(tour, userId: string, nFollow){
    this.db.object(`users/${userId}/followTours/${tour.id}`).set(
      tour
    );
    this.db.object(`tours/${tour.id}/userFollow/${userId}`).set({
      id: userId,
    });

    this.updateFollowsTour(tour.id, nFollow);
  }

  public deleteTourToFollow(tour, userId: string, nFollow){
    this.db.object(`users/${userId}/followTours/${tour.id}`).remove();
    this.db.object(`tours/${tour.id}/userFollow/${userId}`).remove();
    this.updateFollowsTour(tour.id, nFollow);
  }

  private updateFollowsTour(tourId, nFollow){
    this.db.object(`tours/${tourId}/`).update({
      follows: nFollow,
    })
  }

}
