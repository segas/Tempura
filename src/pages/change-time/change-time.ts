import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the ChangeTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-time',
  templateUrl: 'change-time.html',
})
export class ChangeTimePage {
  public time = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.time = {id_worktime: navParams.get("id_worktime"), date: navParams.get("date"), fs_user: navParams.get("fs_user"), pause: navParams.get("pause"), restday: navParams.get("restday"), timeamfrom: navParams.get("timeamfrom"), timeamto: navParams.get("timeamto"), timepmfrom: navParams.get("timepmfrom"), timepmto: navParams.get("timepmto")};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeTimePage');
    console.log(this.time);

  }

  changeTime(){
    console.log(this.time);
    let headers = new Headers();
    //console.log(JSON.parse(this.newTime));
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/change_worktime.php', this.time,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success");
          window.alert("Eintrag geändert");
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
          console.log("changeTime() doesn't working");
          console.log(err.toString());
        });
  }

}
