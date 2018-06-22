// import {Injectable} from '@angular/core';
// import {AngularFireDatabase} from "angularfire2/database";
// import {AngularFireAuth} from "angularfire2/auth";
// import {HomePage} from "../pages/home/home";
// import {RegisterPage} from "../pages/register/register";
// import {User} from "../models/user";
// import {Loading} from "ionic-angular";
//
// @Injectable()
// export class UserService {
//
//   public loading: Loading;
//   user: any;
//
//   constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
//   }
//
//
//   public userLogin(email: string, password: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.auth.auth.signInWithEmailAndPassword(email, password)
//         .then(success => {
//             this.user.mail = email;
//           })
//             .catch(err => reject(err.code));
//     });
//   }
//
//   logout() {
//     this.afAuth.auth.signOut();
//
//   }
//
//   SignUp() {
//     this.navCtrl.push(RegisterPage);
//   }
//
//   private addUserToDatabase(userId: string, user: NewUser) {
//     return this.db.object(`/users/${userId}/profile`)
//       .set(user);
//   }
//
// }
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {NewUser, UserInfo} from "../models/models";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {

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

  public createAccount(user: NewUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password).then(success => {
        delete user.password;
        user.img = "assets/imgs/furgoneta.jpg";
        let userCopy = Object.assign(user);
        userCopy.id = success.user.uid;
        this.addUserToDatabase(userCopy.id, userCopy)
      })
        .catch(err => reject(err.code));
    });
  }

  private addUserToDatabase(userId: string, user: NewUser) {
    return this.db.object(`/users/${userId}/profile`)
      .set(user);
  }

  private addUserToFollow(userId: string, userFollow: string){
    return this.db.object(`/users/${userId}/follows`)
      .set(userFollow);
  }

}
