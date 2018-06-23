
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { Tour } from '../../models/models';


@Injectable()
export class TourService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {

  }

  public getEvents(): Observable<Event[]> {
    return this.db.list(`/tours`)
      .valueChanges().map(events => events.reverse()) as Observable<Event[]>
  }

  public createTour(tour: Tour): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.list(`/tours`).push({}).then(success => {
        this.storage.ref(`/tours/${success.key}.jpg`).putString(tour.image, 'data_url').then(snapshot => {
          this.db.object(`/tours/${success.key}`).set({
            title: tour.title,
            description: tour.description,
            id: success.key,
            imageUrl: snapshot.downloadURL,
            days: tour.days,
            time: tour.time,
          })
            .then(() => resolve())
            .catch(err => reject(err.code));
        })
          .catch(err => reject(err.code));
      }, err => reject(err.code));
    });
  }

}
