import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { Stops } from '../../constants/Stops';
import { Timing } from '../../constants/Timing';
import { BookRide } from 'src/app/models/BookRide';
import { OfferRide } from 'src/app/models/OfferRide';
import { MasterService } from 'src/app/service/master.service';
import { UserDetailsService } from 'src/app/service/user-details.service';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css'],
})
export class BookRideComponent implements OnInit {
  timing = Timing;
  stops = Stops;

  seatsInput!: number;
  price: number = 0;
  isSuccess!: boolean;
  matchedOffers: any[] = [];
  users: string[] = [];
  message: string = '';

  newRideFormData!: FormGroup;
  formData!: BookRide;

  constructor(
    private service: MasterService,
    private userService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.newRideFormData = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
    });
  }

  onSubmitBookRide() {
    if (this.newRideFormData.valid) {
      var newRide = new BookRide(
        Number(this.newRideFormData.value.from),
        Stops[this.newRideFormData.value.to],
        this.newRideFormData.value.date,
        this.newRideFormData.value.time,
        1,
        Number(this.userService.getUserId())
      );
      this.formData = newRide;
      console.log(this.formData);
      this.service.checkForRides(newRide).subscribe((data: any) => {
        this.matchedOffers = [];
        this.message = '';
        if (data.isSuccess) {
          data.value.forEach((element: any) => {
            element.from = Stops[element.from];
            element.to = Stops[Number(newRide.To)];
            element.price =
              (Number(newRide.To) - Number(Stops[element.from])) * 20;
            this.matchedOffers.push(element);
          });

          data.value.forEach((element: any) => {
            this.service.getUser(element.issuerId).subscribe((data) => {
              this.users.push(data.name);
            });
          });
        } else {
          this.message = data.message;
          console.log(this.message);
        }
      });
    }
  }

  onClickBookRide(id: number) {
    this.formData.SeatsRequired = this.seatsInput;
    this.service.bookRide(id, this.formData).subscribe((data: any) => {
      this.message = data.message;
    });
    console.log(this.formData);
    this.matchedOffers=[];
  }

  calculatePrice(prevPrice: number) {
    this.price = prevPrice * this.seatsInput;
  }
}
