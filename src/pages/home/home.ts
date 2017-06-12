import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public worktimes = [];
  public othertimes = [];
  constructor(public navCtrl: NavController, public http: Http) {
  }


  account = {id_user:0};

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.getLast5Days("2017-05-14","2017-05-18");
    this.listOtherTimes();
    //console.log(this.worktimes);
  }

  // Perform the login action when the user submits the login form
  public getLast5Days(datestart, dateend) {
    //var account = window.sessionStorage.getItem('account');
    //console.log(account);
    //this.account = JSON.parse(account);

    var data = {id_user:this.account.id_user, datestart:datestart, dateend:dateend}
    //console.log(data);

    this.listLast5Days(data);
  }

  listLast5Days(userLogin){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_worktime.php',userLogin,headers)
      .map(res => res.json())
      .subscribe(res => {
        this.worktimes = res.worktime;
        console.log("success " + JSON.stringify(this.worktimes));
      }, (err) => {
        console.log("listLast5Days() failed");
      });
  }
  listOtherTimes(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_othertime.php',null,headers)
        .map(res => res.json())
        .subscribe(res => {
          this.othertimes = res.othertime;
          console.log("success " + JSON.stringify(this.othertimes));
        }, (err) => {
          console.log("listOtherTimes() failed");
        });
  }

}
