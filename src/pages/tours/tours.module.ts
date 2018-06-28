import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToursPage } from './tours';
import {JoseComponent} from "../../components/tour/tour";

@NgModule({
  declarations: [
    ToursPage,
    JoseComponent
  ],
  imports: [
    IonicPageModule.forChild(ToursPage),
  ],
})
export class ToursPageModule {}
