import { Component, Input, OnInit } from '@angular/core';
import { BookedRide } from 'src/app/models/BookedRide';
import { User } from 'src/app/models/User';
import { MasterService } from 'src/app/service/master.service';
import { UserDetailsService } from 'src/app/service/user-details.service';

@Component({
  selector: 'app-matches-template',
  templateUrl: './matches-template.component.html',
  styleUrls: ['./matches-template.component.css'],
})
export class MatchesTemplateComponent implements OnInit {
  @Input() public data: any;
  @Input() public name!: string;
  @Input() public isBookRideComp!: boolean;
  @Input() public isBookedRide!: boolean;
  @Input() public isOfferedRide!: boolean;

  bookedUsers: any[] = [];
  userList: User[] = [];
  currentUser!: User;

  constructor(
    private service: MasterService,
    private userService: UserDetailsService
  ) {
    service.getUser(Number(userService.getUserId())).subscribe((data) => {
      this.currentUser = data;
    });
  }
  isFlip = false;
  ngOnInit(): void {}

  array(value: number) {
    var temp = [];
    for (let i = 1; i <= value; i++) {
      temp.push(i);
    }
  }

  onModelClick(id: number) {
    this.service.getOfferUsers(id).subscribe((data) => {
      this.bookedUsers = data;
      console.log(data);

      data.forEach((element) => {
        console.log(element);

        this.service.getUser(element.userId).subscribe((responseData) => {
          this.userList.push(responseData);
          console.log(responseData);
        });
      });
    });
  }

  toggleFlip() {
    this.isFlip = !this.isFlip;
  }
}
