import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user ={username:'', password:'',remember:false};
  constructor(private dialogref:MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmitForm() {
    console.log("user:",this.user);
    this.dialogref.close();
  }
  

}
