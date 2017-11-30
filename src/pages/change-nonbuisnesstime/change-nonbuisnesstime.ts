import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ChangeNonbuisnesstimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-nonbuisnesstime',
  templateUrl: 'change-nonbuisnesstime.html',
})
export class ChangeNonbuisnesstimePage {
  public time = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.time = {id_nonbuisnesstime: navParams.get("id_nonbuisnesstime"), type: navParams.get("type"), datefrom: navParams.get("datefrom"), dateto: navParams.get("dateto"), halfaday: navParams.get("halfaday")};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeNonbuisnesstimePage');
  }

  changeNonBuisnessTime(){
    console.log(this.time);
    let headers = new Headers();
    //console.log(JSON.parse(this.newTime));
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/change_nonbuisnesstime.php', this.time,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success");
          window.alert("Eintrag geändert");
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
          console.log("changeNonBuisnessTime() doesn't working");
          console.log(err.toString());
        });
  }

}
