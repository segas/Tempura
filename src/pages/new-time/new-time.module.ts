import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTimePage } from './new-time';

@NgModule({
  declarations: [
    NewTimePage,
  ],
  imports: [
    IonicPageModule.forChild(NewTimePage),
  ],
  exports: [
    NewTimePage
  ]
})
export class NewTimePageModule {}
