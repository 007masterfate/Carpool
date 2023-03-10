import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { BookRideComponent } from './components/book-ride/book-ride.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyRidesComponent } from './Components/my-rides/my-rides.component';
import { OfferRideComponent } from './Components/offer-ride/offer-ride.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponentComponent,
    children: [
      {
        path: '',
        redirectTo: 'signup',
        pathMatch: 'full',
      },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: 'bookride',
    component: BookRideComponent,
  },
  {
    path: 'offerride',
    component: OfferRideComponent,
  },
  {
    path: 'myrides',
    component: MyRidesComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: '**',
    component: UnauthorizedPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// canActivate: [AuthGuard],
