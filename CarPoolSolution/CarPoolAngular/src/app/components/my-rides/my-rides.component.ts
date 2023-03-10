import { Component, OnInit } from '@angular/core';
import { BookedRide } from 'src/app/models/BookedRide';
import { OfferRide } from 'src/app/models/OfferRide';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css'],
})
export class MyRidesComponent implements OnInit {
  bookedRides!: BookedRide[];
  offeredRides: any[] = [];
  users: string[] = [];
  constructor(private service: MasterService) {}

  ngOnInit(): void {
    this.service.rideHistory().subscribe((data) => {
      this.bookedRides = data;
      data.forEach((element: any) => {
        console.log(element);

        this.service.getUser(element.offerId).subscribe((data) => {
          this.users.push(data.name);
          console.log(this.users);
        });
      });
    });
    this.service.offerHistory().subscribe((data) => {
      this.offeredRides = data;
    });
  }
}
