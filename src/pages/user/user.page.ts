import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../../services/user-data.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  user: any;
  file: any;
  imageValid = false;
  

  constructor(public userService: UserDataService, public router: Router, public activatedRoute: ActivatedRoute) {
   this.getUser();
  }

  ngOnInit() {}

  getUser(){
    this.activatedRoute.queryParams.subscribe((res) => {
      this.user = res;
      console.log("user in users page", this.user)
    })
  }

  resetInput(inputId) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  }

  selectFile(event) {
    this.imageValid = false;
    this.file = event.srcElement.files[0];
    if (
      this.file &&
      (this.file.type === "image/jpeg" || this.file.type === "image/png") &&
      this.file.size <= 5e6
    ) {
      this.imageValid = true;
    }
  }

  saveProfileImage() {
    const path = 'user_images/' + this.user.id;
    this.userService.addProfileImage(path, this.file).then(() => {
      //show the profile photo there
    })
  }

  goToRecipeCreate() {
    this.router.navigate(["/recipe-create"], {queryParams: this.user});
  }

  goToRecipeList() {
    this.router.navigate(["/recipe-list"]);
  }
}
