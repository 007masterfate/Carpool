import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private service: MasterService,
    private router: Router
  ) {}
  signUpForm!: FormGroup;
  show: boolean = false;
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
        ),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
        ),
      ]),
    });
  }

  onSubmitSignUp() {
    if (this.signUpForm.valid) {
      var trimed = this.signUpForm.value.username.split('@')[0];
      var newUser = new User(
        this.signUpForm.value.username,
        this.signUpForm.value.password,
        trimed
      );
      console.log(newUser);

      this.service.postNewUser(newUser).subscribe((responseData: any) => {
        if (responseData.isSuccess) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  displayPassword() {
    this.show = !this.show;
  }
}
