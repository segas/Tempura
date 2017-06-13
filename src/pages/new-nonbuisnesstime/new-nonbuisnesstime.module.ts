import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewNonbuisnesstimePage } from './new-nonbuisnesstime';

@NgModule({
  declarations: [
    NewNonbuisnesstimePage,
  ],
  imports: [
    IonicPageModule.forChild(NewNonbuisnesstimePage),
  ],
  exports: [
    NewNonbuisnesstimePage
  ]
})
export class NewNonbuisnesstimePageModule {}
