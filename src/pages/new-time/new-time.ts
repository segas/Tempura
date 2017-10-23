import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the NewTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-time',
  templateUrl: 'new-time.html',
})
export class NewTimePage {

  newTime = {id_user: null, date: this.getDate(), timeamfrom: this.getTime(), timeamto: this.getTime(), timepmfrom: this.getTime(), timepmto: this.getTime(), pause: 0, restday: 0};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTimePage');
    var account = window.sessionStorage.getItem('account');
    account = JSON.parse(account);
    var d = new Date;

    console.log(d.getHours())
  }

  createNewTime(){
    this.newTime.id_user = '0';
    console.log(this.newTime);
    let headers = new Headers();
    //console.log(JSON.parse(this.newTime));
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/create_worktime.php', this.newTime,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success");
          window.alert("Eintrag erfasst");
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
          console.log("createNewTime() doesn't working");
          console.log(err.toString());
        });
  }

    getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var dd1;
        var mm1;

        var yyyy = today.getFullYear();
        if(dd<10){
            dd1='0'+dd;
        }else{
            dd1 = dd;
        }
        if(mm<10){
            mm1='0'+mm;
        }else {
            mm1 = mm;
        }
        var today1 = yyyy+"-"+mm1+"-"+dd1;
        return today1;
    }
    getTime(){
        var now = new Date();
        var hh = now.getHours();
        var mm = now.getMinutes();
        var ss = "00";
        var now1 = hh+":"+mm+":"+ss;
        return now1;
    }
}
