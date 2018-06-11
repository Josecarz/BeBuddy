import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {TravelPage} from "../travel/travel";
import {BuddiesPage} from "../buddies/buddies";
import {PerfilPage} from "../perfil/perfil";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TravelPage;
  tab3Root = BuddiesPage;
  tab4Root = LoginPage;

  constructor() {

  }
}
