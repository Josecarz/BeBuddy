import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitydetailPage } from './citydetail';
import {DaniComponent} from "../../components/tour/tour";

@NgModule({
  declarations: [
    CitydetailPage,
    DaniComponent
  ],
  imports: [
    IonicPageModule.forChild(CitydetailPage),
  ],
})
export class CitydetailPageModule {}
