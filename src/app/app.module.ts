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
import {DataProvider} from "../providers/data";
import {HttpModule} from "@angular/http";
import {TripdetailPage} from "../pages/tripdetail/tripdetail";
import {UserService} from "../providers/user-service";
import {CountrydetailPage} from "../pages/countrydetail/countrydetail";
import {CitydetailPage} from "../pages/citydetail/citydetail";
import {Ionic2RatingModule} from "ionic2-rating";
import {FavouritesService} from "../providers/favourites-service";
import {EditPerfilComponent} from "../components/edit-perfil/edit-perfil";
import {RatingService} from "../providers/rating-service";
import {CreateTourComponent} from "../components/create-tour/create-tour";
import {CameraService} from "../providers/camera-service";
import {Camera} from "@ionic-native/camera";
import {TourService} from "../providers/tour-service";
import {CommentsComponent} from "../components/comments/comments";
import {ToursPage} from "../pages/tours/tours";
import {ChatService} from "../providers/chat-service";
import {ChatPage} from "../pages/chat/chat";
import {LoadDataComponent} from "../components/load-data/load-data";
import {TourComponent} from "../components/tour/tour";
import {TourCarrouselComponent} from "../components/tour-carrousel/tour-carrousel";



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
    TripdetailPage,
    CountrydetailPage,
    CitydetailPage,
    EditPerfilComponent,
    CreateTourComponent,
    CommentsComponent,
    ToursPage,
    ChatPage,
    LoadDataComponent,
    TourComponent,
    TourCarrouselComponent
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
    HttpModule,
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
    CitydetailPage,
    EditPerfilComponent,
    CreateTourComponent,
    CommentsComponent,
    ToursPage,
    ChatPage,
    LoadDataComponent,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    DbApiService,
    UserService,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    FavouritesService,
    RatingService,
    CameraService,
    Camera,
    TourService,
    ChatService

  ]
})
export class AppModule {}
