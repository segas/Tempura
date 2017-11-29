import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { ChangeTimePage } from '../change-time/change-time';

/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  public worktimes = [];
  public othertimes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  account = {id_user:0};
  time = {month: null, year: null};

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    this.getLastMonth();
  }

  getLastMonth() {
    var account = window.sessionStorage.getItem('account');
    //console.log(datestart);
    this.account = JSON.parse(account);
    console.log(this.account);

    var data = {id_user:this.account.id_user, month:this.time.month, year:this.time.year}
    //console.log(data);

    this.listOtherTimes(data);
    this.listLastMonthWorktime(data);
  }

  deleteRow(id_worktime){
    var data = {id: id_worktime};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/remove_worktime.php', data, headers)
      .map(res => res.json())
      .subscribe(res => {
        console.log("deleteRow() success");
        this.getLastMonth();
      }, (err) => {
        console.log("deleteRow() failed");
      });
  }

  listLastMonthWorktime(userLogin){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_report_worktime.php',userLogin,headers)
      .map(res => res.json())
      .subscribe(res => {
        this.worktimes = res.worktime;
        console.log("success " + JSON.stringify(this.worktimes));
      }, (err) => {
        console.log("listLastMonthWorktime() failed");
      });
  }
  listOtherTimes(userLogin){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_report_other_times.php',userLogin,headers)
        .map(res => res.json())
        .subscribe(res => {
          this.othertimes = res.othertime;
          console.log("success " + JSON.stringify(this.othertimes));
        }, (err) => {
          console.log("listOtherTimes() failed");
        });
  }
  change(time){
    console.log("change ");
    console.log(time);
    this.navCtrl.push(ChangeTimePage, time)
  }
  delete(id_worktime){
    console.log("delete ");
    console.log(id_worktime);
    this.deleteRow(id_worktime);
  }
}
