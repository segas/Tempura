import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { ChangeTimePage } from '../change-time/change-time';
import { ChangeNonbuisnesstimePage } from '../change-nonbuisnesstime/change-nonbuisnesstime';

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

    this.load_Data();
    //console.log(this.worktimes);
  }

  public load_Data(){
    this.getLast5Days(this.getDate5DaysBefore(),this.getDate());
    this.getLastMonth(this.getDateLastMonth());
  }

  // Perform the login action when the user submits the login form
  public getLast5Days(datestart, dateend) {
    var account = window.sessionStorage.getItem('account');
    //console.log(datestart);
    this.account = JSON.parse(account);
    console.log(this.account);

    var data = {id_user:this.account.id_user, datestart:datestart, dateend:dateend}
    //console.log(data);

    this.listLast5Days(data);
  }
  public getLastMonth(date) {
    //var account = window.sessionStorage.getItem('account');
    //console.log(datestart);
    //this.account = JSON.parse(account);

    var data = {id_user:this.account.id_user, date:date}
    //console.log(data);

    this.listOtherTimes(data);
  }
  deleteRow(id_worktime){
    var data = {id: id_worktime};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/remove_worktime.php', data, headers)
      .map(res => res.json())
      .subscribe(res => {
        console.log("deleteRow() success");
        this.load_Data();
      }, (err) => {
        console.log("deleteRow() failed");
      });
  }
  deleteRowNonBuisness(id_nonbuisnesstime){
    var data = {id: id_nonbuisnesstime};
    console.log(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/remove_nonbuisness.php', data, headers)
      .map(res => res.json())
      .subscribe(res => {
        console.log("deleteRow() success");
        this.load_Data();
      }, (err) => {
        console.log("deleteRow() failed");
      });
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
  listOtherTimes(userLogin){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/get_othertime.php',userLogin,headers)
        .map(res => res.json())
        .subscribe(res => {
          this.othertimes = res.othertime;
          console.log("success " + JSON.stringify(this.othertimes));
        }, (err) => {
          console.log("listOtherTimes() failed");
        });
  }

  logout(){
    console.log("Logout");
    window.sessionStorage.removeItem('account');
    this.navCtrl.setRoot(LoginPage);
  }

  delete(id_worktime){
    console.log("delete ");
    console.log(id_worktime);
    this.deleteRow(id_worktime);
  }
  change(time){
    console.log("change ");
    console.log(time);
    this.navCtrl.push(ChangeTimePage, time)
  }
  deletenonbuisness(id_nonbuisnesstime){
    console.log("delete nonbuisness");
    console.log(id_nonbuisnesstime);
    this.deleteRowNonBuisness(id_nonbuisnesstime);

  }
  changenonbuisness(nonbuisness){
    console.log("change nonbuisness");
    console.log(nonbuisness);
    this.navCtrl.push(ChangeNonbuisnesstimePage, nonbuisness)
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
  getDate5DaysBefore(){
    var today = new Date();
    today.setDate(today.getDate() - 5);
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
  getDateLastMonth(){
    var today = new Date();
    today.setDate(today.getDate() - 31);
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

}
