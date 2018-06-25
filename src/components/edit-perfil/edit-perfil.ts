import { Component } from '@angular/core';
import {DbApiService} from "../../providers/db-api.service";
import {LoadingController, NavController, NavParams} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user-service";
import {NewUser} from "../../models/models";
import {DataProvider} from "../../providers/data";
import {FormControl} from "@angular/forms";
import {LoginPageModule} from "../../pages/login/login.module";
import {LoginPage} from "../../pages/login/login";

/**
 * Generated class for the EditPerfilComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-perfil',
  templateUrl: 'edit-perfil.html'
})
export class EditPerfilComponent {

  text: string;
  userInfo: any;
  newUser: NewUser = { name: '', email: '', city: ''};
  usuario: any;
  name: string;
  email: string;
  img: string;
  id: string;
  city: string;
  sites2=[];
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private dbapi: DbApiService,
              private profile: UserService, private auth: AngularFireAuth,  private loadingCtrl: LoadingController,
              private dataService: DataProvider,) {
    console.log('Hello EditPerfilComponent Component');
    this.text = 'Hello World';
    this.userInfo = this.navParams.data;
    this.searchControl = new FormControl();
    console.log('USERINFO' + this.userInfo.name);
  }

  ionViewWillEnter(){
    this.newUser.name = this.userInfo.name;
    this.newUser.email = this.userInfo.email;
    this.newUser.img = this.userInfo.img;
    this.newUser.city = this.userInfo.city;

  }

  ionViewDidLoad(){
    this.auth.authState.subscribe(data => {
      this.usuario = data;
      if (this.usuario != null) {
        console.log("USUARIOEDIT   " + this.usuario.uid);
        this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
          (data) => {
            this.userInfo = data;
            console.log("USUARIO INFO   " + this.userInfo.name);
          }
        );
      }
    });

    this.dbapi.getCity().subscribe(
      (data) => {
        this.sites2 = data;
        console.log(this.sites2);
        this.setFilteredItems();
      }
    );

    this.setFilteredItems();
    this.searchControl.valueChanges.subscribe(search  => {
      if(this.searchTerm != ''){
        this.searching = true;
      }
      this.setFilteredItems();
    });
  }

  onSearchInput(){
    this.searching = false;
  }

  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm, this.sites2);
  }

  editUser(): void {
    let userCopy = Object.assign(this.newUser);
    userCopy.id = this.userInfo.id;
    this.profile.editUser(userCopy, this.usuario.uid);
    this.navCtrl.setRoot(LoginPage)
  }

  selectCity(city){
    this.searchTerm = '';
    this.newUser.city = city.id;
    let userCopy = Object.assign(this.newUser);
    userCopy.id = this.userInfo.id;
    console.log(city);
    this.profile.updateCity( userCopy.city, this.usuario.uid);
  }



}
