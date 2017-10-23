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
  month = null;
  account = {id_user:0};

  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayPage');
      var data = {id_user:this.account.id_user, date: this.getMonth()};

    this.listHolidays(data);
  }
  listHolidays(month){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_holiday.php',month,headers)
        .map(res => res.json())
        .subscribe(res => {
          this.holidays = res.othertime;
          console.log("success " + JSON.stringify(this.holidays));
        }, (err) => {
          console.log("listOtherTimes() failed");
        });
  }

  loadMonth(){
      var data = {id_user:this.account.id_user, date: this.month};
      this.listHolidays(data)
  }

    getMonth(){
        var today = new Date();
        var mm = today.getMonth()+1; //January is 0!
        var mm1;

        var yyyy = today.getFullYear();

        if(mm<10){
            mm1='0'+mm;
        }else {
            mm1 = mm;
        }
        var today1 = yyyy+"-"+mm1;
        return today1;
    }

}
