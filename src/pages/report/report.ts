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
    //this.getLastMonth();
  }

  getLastMonth() {
    var account = window.sessionStorage.getItem('account');
    //console.log(datestart);
    this.account = JSON.parse(account);
    console.log(this.account);

    this.time.year = this.time.month.substring(0,this.time.month.length-3);
    this.time.month = this.time.month.substring(5,this.time.month.length);

    var data = {id_user:this.account.id_user, month:this.time.month, year:this.time.year};
    console.log(data);

    this.listReport(data);
    this.getholidaydays(data);
    this.getremainingholidaydays(data);
    this.getworktime(data);
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

  listReport(userLogin){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_report.php',userLogin,headers)
      .map(res => res.json())
      .subscribe(res => {
        this.worktimes = res.worktime;
        console.log("success " + JSON.stringify(this.worktimes));
      }, (err) => {
        console.log("listReport() failed");
      });
  }
  change(time){
    console.log("change ");
    console.log(time);
    this.navCtrl.push(ChangeTimePage, time);
  }
  delete(id_worktime){
    console.log("delete ");
    console.log(id_worktime);
    this.deleteRow(id_worktime);
  }

  getworktime(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_worktime_month.php',data,headers)
      .map(res => res.json())
      .subscribe(res => {
        this.worktimes = res.worktime;
        console.log("success " + JSON.stringify(this.worktimes));
      }, (err) => {
        console.log("listReport() failed");
      });
  }
  getholidaydays(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_usedholidaydays.php',data,headers)
      .map(res => res.json())
      .subscribe(res => {
        this.worktimes = res.worktime;
        console.log("success " + JSON.stringify(this.worktimes));
      }, (err) => {
        console.log("listReport() failed");
      });
  }
  getremainingholidaydays(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_remaining_holiday_days.php',data,headers)
      .map(res => res.json())
      .subscribe(res => {
        this.worktimes = res.worktime;
        console.log("success " + JSON.stringify(this.worktimes));
      }, (err) => {
        console.log("listReport() failed");
      });
  }
}
