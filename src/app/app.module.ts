import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NewTimePage } from '../pages/new-time/new-time';
import { NewNonbuisnesstimePage } from '../pages/new-nonbuisnesstime/new-nonbuisnesstime';
import { HolidayPage } from '../pages/holiday/holiday';
import { PersonalPage } from '../pages/personal/personal';
import { ReportPage } from '../pages/report/report';
import { ChangeTimePage } from '../pages/change-time/change-time';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NewTimePage,
    NewNonbuisnesstimePage,
    HolidayPage,
    PersonalPage,
    ReportPage,
    ChangeTimePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NewTimePage,
    NewNonbuisnesstimePage,
    HolidayPage,
    PersonalPage,
    ReportPage,
    ChangeTimePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
