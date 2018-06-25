import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {NewUser} from "../../models/models";
import {UserService} from "../../providers/user-service";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {EditPerfilComponent} from "../../components/edit-perfil/edit-perfil";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  newUser: NewUser = { name: '', email: '', password: '' };
  passwordVisible: boolean = false;
  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  usuario: any;
  userInfo:any;
  constructor(public navCtrl: NavController, private profile: UserService, private loadingCtrl: LoadingController, private auth: AngularFireAuth) {
  }

  changePasswordVisbility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  createAccount(): void {
    let loader = this.loadingCtrl.create({ content: 'Creando cuenta' });
    loader.present();

    setTimeout(() => {
      this.auth.authState.subscribe(data => {
        this.usuario = data;
        if (this.usuario != null) {
          console.log("USUARIO   " + this.usuario.uid);
          this.profile.getUserProfileInfo(this.usuario.uid).subscribe(
            (data) => {
              this.userInfo = data;
              console.log("USUARIO INFO   " + this.userInfo.name);
            }
          );
        }
        this.navCtrl.setRoot(EditPerfilComponent, this.userInfo);
        loader.dismiss();
      })
    }, 2000);
    this.profile.createAccount(this.newUser).then(() => {
    }).catch(err => {
      console.log(err);

    });
    console.log("jkdlgagfdajgfjshkgfdahskfgdajhkfgdjhaf0");
  }



}
