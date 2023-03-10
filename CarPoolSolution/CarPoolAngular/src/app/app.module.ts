import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { BookRideComponent } from './components/book-ride/book-ride.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyRidesComponent } from './Components/my-rides/my-rides.component';
import { OfferRideComponent } from './Components/offer-ride/offer-ride.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { MasterService } from './service/master.service';
import { AuthService } from './shared/core/auth.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { HeaderComponent } from './shared/header/header.component';
import { IntroTemplateComponent } from './shared/intro-template/intro-template.component';
import { MatchesTemplateComponent } from './shared/matches-template/matches-template.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { EnumToArrayPipe } from './pipe/enum-to-array.pipe';
import { StartEndstyleComponent } from './shared/start-endstyle/start-endstyle.component';
import { HttpInterceptorService } from './shared/core/Http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BookRideComponent,
    OfferRideComponent,
    ProfileComponent,
    MyRidesComponent,
    SignUpComponent,
    HeaderComponent,
    IntroTemplateComponent,
    MatchesTemplateComponent,
    UnauthorizedPageComponent,
    AuthComponentComponent,
    EnumToArrayPipe,
    StartEndstyleComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuard,
    AuthService,
    MasterService,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {}
