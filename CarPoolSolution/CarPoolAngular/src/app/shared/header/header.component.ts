import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/service/user-details.service';
import { SaveTokenService } from '../token-service/save-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dropDownStatus = true;
  name!: string | null;
  constructor(
    private router: Router,
    private user: UserDetailsService
  ) {
    this.dropDownStatus = true;
    this.name = this.user.getUser();
  }

  ngOnInit(): void {}

  toggleDropDown() {
    this.dropDownStatus = !this.dropDownStatus;
  }

  onLogOut() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
