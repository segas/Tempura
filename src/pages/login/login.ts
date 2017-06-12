import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  // Form data for the login page
  loginData = {};
  public users = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.listAll();
  }

  loginUser(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/login.php',this.loginData,headers)
      .map(res => res.json())
      .subscribe(res => {
        //log in successfull
        if(res.userData.correct == 'True'){
          //window.alert("Login funktioniert");
          //console.log(JSON.stringify(res.userData));
          window.sessionStorage.setItem('account',JSON.stringify(res.userData));
          this.navCtrl.setRoot(HomePage);
        }else{
          var failureAlert = document.getElementById('login_failure_alert');
          failureAlert.innerHTML = "Passwort falsch";
        }
      }, (err) => {
        //log in failed
        console.log("loginUser doesn't working");
      });
  }

  listAll(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/show_users.php',null,headers)
      .map(res => res.json())
      .subscribe(res => {
        //console.log("success "+JSON.stringify(res.users));
        this.users = res.users;
      }, (err) => {
        console.log("listAll doesn't working");
      });
  }
}
