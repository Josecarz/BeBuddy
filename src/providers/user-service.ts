import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Follow, NewUser, Rating, UserInfo} from "../models/models";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {
  usuario: any;
  rating: any;
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
  }

  public userLogin(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(email, password)
        .then(success => {
          resolve();
        })
        .catch(err => reject(err.code));
    });
  }

  public userLogout(){
    this.auth.auth.signOut();
  }

  public getUserProfileInfo(userId: string):  Observable <any>{
    return this.db.object(`/users/${userId}/profile`)
      .valueChanges()
  }

  public getUserRatingInfo(userId: string):  Observable <any>{
    return this.db.object(`/users/${userId}/rating`)
      .valueChanges()
  }

  public createAccount(user: NewUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password).then(success => {
        delete user.password;
        user.img = "assets/imgs/furgoneta.jpg";
        let userCopy = Object.assign(user);
        userCopy.id = success.user.uid;
        this.addUserToDatabase(userCopy.id, userCopy);
      })
        .catch(err => reject(err.code));
    });
  }

  public editUser(user: NewUser, id){
    let userCopy = Object.assign(user);
    this.db.object(`/users/${id}/profile`)
      .update(userCopy);
    // this.addUserToDatabase(id, userCopy)
  }

  public updateCity(city, id){
    // let userCopy = Object.assign(user);
    this.db.object(`/users/${id}/city`)
      .set(city);
  }

  private addUserToDatabase(userId: string, user: NewUser) {
      return this.db.object(`/users/${userId}/profile`).set(user);
  }

  public addRatingToUser(userId: string, rating: Rating) {
    this.db.object(`/users/${userId}/rating`).set(rating);
    this.db.object(`/users/${userId}/follows/${userId}`).set(userId);
  }

  public addUserToFollow(userId: string, userFollow: Follow){
    return this.db.object(`/users/${userId}/follows/${userFollow.id}`)
      .set(userFollow);
  }

}
