import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/service/user-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name!: string | null;
  constructor(public user: UserDetailsService) {
    this.name = user.getUser();
  }

  ngOnInit(): void {}
}
