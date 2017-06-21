import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayPage } from './holiday';

@NgModule({
  declarations: [
    HolidayPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayPage),
  ],
  exports: [
    HolidayPage
  ]
})
export class HolidayPageModule {}
