import { Component } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  db: any;

  constructor() {
    this.db = firebase.firestore();
  }

  sendData() {
    this.db.collection("cities")
      .doc("LA")
      .set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }
}
