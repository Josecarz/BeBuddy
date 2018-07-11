//a-service...
//comandos para inyectar código en settings live templates

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class DbApiService {
  // currentTourney: any = [];
  sites: any [];

  constructor(private fb: AngularFireDatabase,  private afDB: AngularFireDatabase) {

  }

  getTours(): Observable<any> {
    return this.fb.list('tours').valueChanges();
  }
  getBuddies(): Observable<any> {
    return this.fb.list('users').valueChanges();
  }

  getCountry(): Observable<any> {
    return this.fb.list('countries').valueChanges();
  }

  getCity(): Observable<any> {
    return this.fb.list('cities').valueChanges();
  }

  getCities(id): Observable<any> {
    return this.fb.list(`countries/${id}/ciudades`).valueChanges();
  }

  getInfoCity(id): Observable<any> {
    return this.fb.object("cities/" + id).valueChanges();
  }

  getComments(id): Observable<any> {
    return this.fb.list('tours/'+id+'/comments/').valueChanges();
  }

  getCommentsUser(id): Observable<any> {
    return this.fb.list('users/'+id+'/profile/comments').valueChanges();
  }

  pushUserRating(userId, rate) {
    console.log(rate);
    this.afDB.database.ref(`/users/${userId}/rating/`).set(rate);
  }

  pushTourRating(tour) {
    console.log(tour);
    this.afDB.database.ref(`/tours/${tour.id}`).set(tour);
  }

  getInfoUserTour(id): Observable<any> {
    return this.fb.object(`/users/${id}/profile/`).valueChanges();
  }

  public getFollows(userId: string):  Observable <any>{
    return this.fb.list(`/users/${userId}/follows`)
      .valueChanges()
  }

  public getFollowsTour(userId: string):  Observable <any>{
    console.log("EN DBAPISERVICE")
    return this.fb.list(`/users/${userId}/followTours`)
      .valueChanges()
  }


  public getUser(userId: string){
    return this.fb.object(`/users/${userId}/`)
      .valueChanges()
  }



}
