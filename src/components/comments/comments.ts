import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase}  from "angularfire2/database";
import {DbApiService} from "../../providers/db-api.service";

/**
 * Generated class for the CommentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})
export class CommentsComponent {
  myForm: FormGroup;
  recipe: any;
  usuario: any;
  comments=[];
  from: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private afDB: AngularFireDatabase,
              private service: DbApiService) {
    this.myForm = this.createMyForm();
    this.recipe = this.navParams.get('tour');
    this.usuario = this.navParams.get('usuario');
    this.from = this.navParams.get('from');
    console.log(this.recipe);
    console.log(this.usuario);
    console.log(this.from)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    if (this.from!='user' && this.recipe) {
      console.log(this.recipe.id)
      this.service.getComments(this.recipe.id).subscribe(data => this.comments = data);
    }
    else if (this.from=='user') {
      console.log(this.usuario.id)
      this.service.getCommentsUser(this.usuario.id).subscribe(data => this.comments = data);
    }
    console.log(this.comments);
  }
  private createMyForm() {
    return this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }
  addComment(recipe) {
    console.log("recipe", recipe);
    console.log("this.recipes", this.recipe);
    //recipe.comments[]=recipe.newComment;
    // recipe.comments.
    if (recipe.comments[0] == "") {
      recipe.comments.pop();
      recipe.comments.push(recipe.newComment);
    } else {
      recipe.comments.push(recipe.newComment);
    }
    recipe.newComment = null;
    if (this.from != 'user') {
      this.afDB.database.ref('tours/' + recipe.id).set(recipe);
    } else if (this.from == 'user') {
      this.afDB.database.ref('users/' + this.usuario.id + '/profile/').set(recipe);
    }
  }

}
