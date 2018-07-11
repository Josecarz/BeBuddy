import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Follow, NewUser, Rating, UserInfo} from "../models/models";
import {Observable} from "rxjs/Observable";
import {AngularFireStorage} from "angularfire2/storage";


@Injectable()
export class UserService {
  usuario: any;
  rating: any;
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, private storage: AngularFireStorage) {
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
        // user.comments: new Array(""),
        let userCopy = Object.assign(user);
        userCopy.id = success.user.uid;
        this.addUserToDatabase(userCopy.id, userCopy);
      })
        .catch(err => reject(err.code));
    });
  }

  public editUser(user: NewUser, id){

    return new Promise((resolve, reject) => {
      this.storage.ref(`/users/${Date.now()}.jpg`).putString(user.img, 'data_url').then(snapshot => {
        this.db.object(`/users/${id}/profile`).update({
          name: user.name,
          img: snapshot.downloadURL,
          email: user.email,
          city: user.city,
        }).then(snapshot=>{
        }).then(() => resolve())
          .catch(err => reject(err.code));
      })
        .catch(err => reject(err.code));
    });


  }

  public updateCity(city, id){
    // let userCopy = Object.assign(user);
    this.db.object(`/users/${id}/city`)
      .set(city);
  }

  public getCity(city): Observable<any>{
    console.log(city)
    return this.db.object(`/cities/${city}`).valueChanges();
  }


  private addUserToDatabase(userId: string, user: NewUser) {
    this.db.object(`/users/${userId}/profile`).set(user);
    this.db.object(`/users/${userId}/profile`).update({comments: new Array("")})
  }



  public addRatingToUser(userId: string, rating: Rating) {
    this.db.object(`/users/${userId}/rating`).set(rating);
  }

  public addUserToFollow(userId: string, userFollow: Follow){
    return this.db.object(`/users/${userId}/follows/${userFollow.id}`)
      .set(userFollow);
  }

  public deleteUserToFollow(userId: string, user){
    return this.db.object(`/users/${userId}/follows/${user}`)
      .remove();
  }

}
