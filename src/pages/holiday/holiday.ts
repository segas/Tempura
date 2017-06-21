import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the HolidayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-holiday',
  templateUrl: 'holiday.html',
})
export class HolidayPage {
  public holidays = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayPage');
    this.listHolidays();
  }
  listHolidays(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_holiday.php',null,headers)
        .map(res => res.json())
        .subscribe(res => {
          this.holidays = res.othertime;
          console.log("success " + JSON.stringify(this.holidays));
        }, (err) => {
          console.log("listOtherTimes() failed");
        });
  }

}
