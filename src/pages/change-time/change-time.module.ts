import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeTimePage } from './change-time';

@NgModule({
  declarations: [
    ChangeTimePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeTimePage),
  ],
  exports: [
    ChangeTimePage
  ]
})
export class ChangeTimePageModule {}
