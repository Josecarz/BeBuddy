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

  getCountry(): Observable<any> {
    return this.fb.list('countries').valueChanges();
  }

  getCity(): Observable<any> {
    return this.fb.list('cities').valueChanges();
  }

  // getCity(): Observable<any> {
  //   return this.fb.list('cities/').valueChanges();
  // }

  getCities(id): Observable<any> {
    return this.fb.list(`countries/${id}/ciudades`).valueChanges();
  }

  getInfoCity(id): Observable<any> {
    return this.fb.object("cities/" + id).valueChanges();
  }

  getComments(id): Observable<any> {
    return this.fb.list('recipes/'+id+'/comments/').valueChanges();
  }


  getIngredients(): Observable <any> {
    return this.fb.list('alimentos/1/todos').valueChanges();
  }

  pushIngredient(ingredient){
    this.fb.list('alimentos/1/todos').push({
      energetic_value: ingredient.calories,
      id: ingredient.id,
      name: ingredient.name,
      vitamins: ingredient.vitamins
    });
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
