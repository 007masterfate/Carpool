import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Timing } from 'src/app/constants/Timing';
import { MasterService } from 'src/app/service/master.service';
import { UserDetailsService } from 'src/app/service/user-details.service';
import { Stops } from '../../constants/Stops';
import { OfferRide } from '../../models/OfferRide';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css'],
})
export class OfferRideComponent implements OnInit {
  timing = Timing;
  stops = Stops;

  message: string = '';
  isSuccess!: boolean;
  isSecondForm: boolean = true;
  stopsCount: number[] = [1];
  formData!: FormGroup;
  stopsInputLimit!: number;

  calculatedPrice: number = 0;

  constructor(
    private service: MasterService,
    private userService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      seat: new FormControl(null, Validators.required),
      stop1: new FormControl('none', [Validators.required]),
    });
  }

  onSubmitForm() {
    if (this.formData.valid) {
      var newOffer = new OfferRide(
        Number(this.formData.value.from),
        Stops[this.formData.value.to],
        this.formData.value.date,
        this.formData.value.time,
        Number(this.formData.value.seat),
        this.calculatedPrice,
        '',
        Number(this.userService.getUserId())
      );

      newOffer.Stops = this.convertStopsToEnums(this.formData.value);
      this.service.newOffer(newOffer).subscribe((data: any) => {
        this.message = data.message;
        this.isSuccess = data.isSuccess;
      });
      console.log(newOffer);
    }
    this.formData.reset();
    this.calculatedPrice = 0;
    this.isSecondForm = true;
  }

  onClickNext(from: number, to: number) {
    this.stopsInputLimit = Number(Stops[to]) - from - 1;
    this.isSecondForm = !this.isSecondForm;
    this.isSuccess = false;
    this.message = '';
  }

  incrementStops() {
    if (this.stopsCount.length < this.stopsInputLimit) {
      this.stopsCount.push(this.stopsCount.length + 1);
      this.formData.addControl(
        'stop' + this.stopsCount.length,
        new FormControl('none', Validators.required)
      );
    }
  }

  decrementStops() {
    this.formData.removeControl('stop' + this.stopsCount.length);
    this.stopsCount.pop();
  }

  calculatePrice(from: number, to: number, seats: number) {
    this.calculatedPrice = (Number(Stops[to]) - from) * 20;
  }

  convertStopsToEnums(data: any) {
    var resultString = '';
    var i = 1;
    while (this.stopsCount.length >= i) {
      if (
        (data['stop' + i] != null || data['stop' + i] != '') &&
        data['stop' + i] != 'none'
      ) {
        resultString += Stops[data['stop' + i]];
      }
      i += 1;
    }
    if (resultString == 'undefined') return '';
    return resultString;
  }
}
