import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { IndexcarouselComponent } from './indexcarousel/indexcarousel.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { CardsComponent } from './cards/cards.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationComponent } from './application/application.component';
import { UserDashboardNavbarComponent } from './user-dashboard-navbar/user-dashboard-navbar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddressComponent } from './address/address.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DatePipe } from '@angular/common';
import { RtoOfficeComponent } from './rto-office/rto-office.component';
import { RtoOfficerComponent } from './rto-officer/rto-officer.component';
import { AdminComponent } from './admin/admin.component';
import { ActRulePoliciesComponent } from './act-rule-policies/act-rule-policies.component';
import { FaqComponent } from './faq/faq.component';
import { ViewApplicationComponent } from './view-application/view-application.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    IndexcarouselComponent,
    MarqueeComponent,
    FooterComponent,
    ScrollTopComponent,
    CardsComponent,
    UserRegistrationComponent,
    LoginComponent,
    ContactPageComponent,
    UserDashboardComponent,
    HomeComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ApplicationComponent,
    UserDashboardNavbarComponent,
    AboutUsComponent,
    AddressComponent,
    DocumentsComponent,
    AppointmentComponent,
    RtoOfficeComponent,
    RtoOfficerComponent,
    AdminComponent,
    ActRulePoliciesComponent,
    FaqComponent,
    ViewApplicationComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [UserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {

}
