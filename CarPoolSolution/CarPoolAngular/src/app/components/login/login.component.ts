import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData!: FormGroup;
  constructor(public service: MasterService) {}

  ngOnInit(): void {
    this.loginData = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
        ),
      ]),
    });
  }

  onSubmit() {
    
    if (this.loginData.valid) {
      var loginCredientials = new Login(
        this.loginData.value.username,
        this.loginData.value.password
      );
      console.log(loginCredientials);
      this.service.loginUser(loginCredientials);
    }
  }
}
