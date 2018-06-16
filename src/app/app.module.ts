import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TravelPage} from "../pages/travel/travel";
import {BuddiesPage} from '../pages/buddies/buddies';
import {PerfilPage} from "../pages/perfil/perfil";
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";

import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth/auth.module";
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database'

import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {DbApiService} from "../providers/db-api.service";
import {CustomerSearchFilter} from "../providers/filter-pipe.pipe";
import {DataProvider} from "../providers/data";
import {HttpModule} from "@angular/http";
import {TripdetailPage} from "../pages/tripdetail/tripdetail";
import {UserService} from "../providers/user-service";
import {CountrydetailPage} from "../pages/countrydetail/countrydetail";
import {CitydetailPage} from "../pages/citydetail/citydetail";
import {Ionic2RatingModule} from "ionic2-rating";



export const FirebaseConfig = {
  apiKey: "AIzaSyBx1SlVPc12DQP6qhxAadMNGNtzMTvEoMU",
  authDomain: "bebuddy-73e89.firebaseapp.com",
  databaseURL: "https://bebuddy-73e89.firebaseio.com",
  projectId: "bebuddy-73e89",
  storageBucket: "bebuddy-73e89.appspot.com",
  messagingSenderId: "804805585543"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    TravelPage,
    BuddiesPage,
    PerfilPage,
    LoginPage,
    RegisterPage,
    CustomerSearchFilter,
    TripdetailPage,
    CountrydetailPage,
    CitydetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    TravelPage,
    BuddiesPage,
    PerfilPage,
    LoginPage,
    RegisterPage,
    TripdetailPage,
    CountrydetailPage,
    CitydetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DbApiService,
    UserService,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider

  ]
})
export class AppModule {}
