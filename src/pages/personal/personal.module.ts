import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalPage } from './personal';

@NgModule({
  declarations: [
    PersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalPage),
  ],
  exports: [
    PersonalPage
  ]
})
export class PersonalPageModule {}
