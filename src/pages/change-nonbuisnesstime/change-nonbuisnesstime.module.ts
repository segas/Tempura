import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeNonbuisnesstimePage } from './change-nonbuisnesstime';

@NgModule({
  declarations: [
    ChangeNonbuisnesstimePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeNonbuisnesstimePage),
  ],
  exports: [
    ChangeNonbuisnesstimePage
  ]
})
export class ChangeNonbuisnesstimePageModule {}
