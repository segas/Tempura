import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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

  newTime = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTimePage');
  }

  createNewTime(){
    //this.newTime.id_user = '0';
    console.log(this.newTime);
    let headers = new Headers();
    //console.log(JSON.parse(this.newTime));
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/create_worktime.php', this.newTime,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success");
        }, (err) => {
          console.log("createNewTime() doesn't working");
          console.log(err.toString());
        });
  }

}
