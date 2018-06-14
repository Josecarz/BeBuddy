import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountrydetailPage } from './countrydetail';

@NgModule({
  declarations: [
    CountrydetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CountrydetailPage),
  ],
})
export class CountrydetailPageModule {}
