import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Stops } from '../constants/Stops';
import { BookedRide } from '../models/BookedRide';
import { BookRide } from '../models/BookRide';
import { Login } from '../models/Login';
import { OfferRide } from '../models/OfferRide';
import { Response } from '../models/Response';
import { AuthService } from '../shared/core/auth.service';
import { SaveTokenService } from '../shared/token-service/save-token.service';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private tokenService: SaveTokenService,
    private userService: UserDetailsService
  ) {}
  BaseUrl: String = 'https://localhost:7164/';
  postNewUser(user: Login) {
    return this.http.post(this.BaseUrl + 'signup', user);
  }

  loginUser(LoginData: Login) {
    this.http
      .post(this.BaseUrl + 'login', LoginData)
      .subscribe((responseData: any) => {
        if (responseData.isSuccess) {
          var jwtToken = responseData.value.substring(
            0,
            responseData.value.length - 1
          );
          var userId = responseData.value[responseData.value.length - 1];
          this.tokenService.setToken(jwtToken);
          this.userService.setUserId(userId);
          this.auth.toggleStatus();
          this.userService.setUser(LoginData.username.split('@')[0]);
          this.router.navigate(['/home']);
        } else {
          alert('Wrong Credentials !!!');
        }
      });
  }

  checkForRides(request: BookRide) {
    return this.http.post(this.BaseUrl + 'Ride/Bookride', request);
  }

  bookRide(id: number, request: BookRide) {
    
    return this.http
      .post(this.BaseUrl + 'Ride/bookride/' + id, request);
      
  }

  newOffer(data: OfferRide) {
    return this.http
      .post(this.BaseUrl + 'Ride/offerride', data);
      
  }

  rideHistory() {
    return this.http
      .get(this.BaseUrl + 'Ride/rides/' + this.userService.getUserId())
      .pipe(
        map((data: any) => {
          var temp: BookedRide[] = [];
          data.value.forEach((element: any) => {
            element.from = Stops[element.from];
            element.to = Stops[element.to];
            temp.push(element);
          });
          return temp;
        })
      );
  }

  offerHistory() {
    return this.http
      .get(this.BaseUrl + 'Ride/offers/' + this.userService.getUserId())
      .pipe(
        map((data: any) => {
          var temp: OfferRide[] = [];
          data.value.forEach((element: any) => {
            element.from = Stops[element.from];
            element.to = Stops[element.to];
            temp.push(element);
          });
          return temp;
        })
      );
  }

  getOfferUsers(offerId: number) {
    return this.http.get(this.BaseUrl + 'Ride/Ridedetails/' + offerId).pipe(
      map((data: any) => {
        var temp: BookedRide[] = [];
        data.value.forEach((element: any) => {
          element.from = Stops[element.from];
          element.to = Stops[element.to];
          temp.push(element);
        });
        return temp;
      })
    );
  }

  getUser(id: number) {
    return this.http.get(this.BaseUrl + 'user/' + id).pipe(
      map((data: any) => {
        if (data.isSuccess) return data.value;
        else {
          alert(data.message);
          return null;
        }
      })
    );
  }
}
