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

  getMyRecipes(user){
    return this.fb.list('recipes').valueChanges();
  }

  pushTour(tour) {
    this.afDB.database.ref('tours/' + tour.id).set(tour);
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

  // getInfoUser(){
  //   return
  // }

  // firebase.database().ref('usuarios').orderByChild('name').equalTo('Moises').on('child_added', function(data) {
  //   var element = data.val();
  //   console.log(element.name);
  // });

  // editRecipe(recipe, user){
  //   this.fb.list(`recipes/${recipe.key}`).update({
  //     name: recipe.name,
  //     ingredient: recipe.ingredients,
  //     tag: recipe.tag,
  //     user: user.email
  //
  //   }, recipe.key);
  // }


  //
  // editRecipe(recipe, user){
  //   this.fb.list(`recipes/${recipe.key}`).update({
  //     name: recipe.name,
  //     ingredient: recipe.ingredients,
  //     tag: recipe.tag,
  //     user: user.email
  //
  //   }, recipe.key);
  // }

  // getTournamentsData(tourneyId): Observable<any> {
  //   return this.fb.object(`tournaments-data/${tourneyId}`).valueChanges()
  //     .map(resp => this.currentTourney = resp);
  // }
  //
  //
  // getCurrentTourney() {
  //   return this.currentTourney;
  // }
}
