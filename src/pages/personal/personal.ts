import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the PersonalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  public users = [];
  public user = {};
  public newUser = {};

  username = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
    this.listAll();

  }

  listAll(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/show_users.php',null,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success "+JSON.stringify(res.users));
          this.users = res.users;
        }, (err) => {
          console.log("listAll doesn't working");
        });
  }
  createUser(){
    console.log(this.newUser);
    let headers = new Headers();
    //console.log(JSON.parse(this.newTime));
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/create_user.php', this.newUser,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success");
          window.alert("User erstellt");
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
          console.log("createUser() doesn't working");
          console.log(err.toString());
        });
  }
  changeUser(){
    console.log(this.user);
    let headers = new Headers();
    //console.log(JSON.parse(this.newTime));
    headers.append('Content-Type', 'application/json');
    this.http.post('http://88.84.20.245/tempura/php/change_user.php', this.user,headers)
        .map(res => res.json())
        .subscribe(res => {
          console.log("success");
          window.alert("Eintrag erfasst");
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
          console.log("changeUser() doesn't working");
          console.log(err.toString());
        });
  }
  showUser(){
      var data = {username: this.username};
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://88.84.20.245/tempura/php/get_user.php',data,headers)
          .map(res => res.json())
          .subscribe(res => {
              console.log("success "+JSON.stringify(res.user[0]));
              this.user = res.user[0];
          }, (err) => {
              console.log("get_user() doesn't working");
          });
  }

}
