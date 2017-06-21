import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NewTimePage } from '../pages/new-time/new-time';
import { HolidayPage } from '../pages/holiday/holiday';
import { PersonalPage } from '../pages/personal/personal';
import { NewNonbuisnesstimePage } from '../pages/new-nonbuisnesstime/new-nonbuisnesstime';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Zeiterfassung', component: HomePage },
      { title: 'Neue Zeiterfassung', component: NewTimePage},
      { title: 'Neue Spezialerfassung', component: NewNonbuisnesstimePage},
      { title: 'Ferien', component: HolidayPage},
      { title: 'Personaleinstellungen', component: PersonalPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
