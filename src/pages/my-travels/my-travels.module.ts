import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTravelsPage } from './my-travels';

@NgModule({
  declarations: [
    MyTravelsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTravelsPage),
  ],
})
export class MyTravelsPageModule {}
