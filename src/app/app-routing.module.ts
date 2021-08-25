import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CardsComponent } from './cards/cards.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationComponent } from './application/application.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddressComponent } from './address/address.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DocumentsComponent } from './documents/documents.component';
import { AdminComponent } from './admin/admin.component';
import { FaqComponent } from './faq/faq.component';
import { RtoOfficerComponent } from './rto-officer/rto-officer.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { PermitComponent } from './permit/permit.component';
import { HyperlinkPolicyComponent } from './hyperlink-policy/hyperlink-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LicenseComponent } from './license/license.component';

const routes : Routes = [
  {
    path : '',
    component : CardsComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'about-us',
    component : AboutUsComponent
  },
  {
    path : 'user-profile',
    component : ProfileComponent
  },
  {
    path : 'user-application',
    component : ApplicationComponent
  },
  {
    path : 'user-address',
    component : AddressComponent
  },
  {
    path : 'user-appointment',
    component : AppointmentComponent
  },
  {
    path : 'user-documents',
    component : DocumentsComponent
  },
  {
    path : 'user-license',
    component : LicenseComponent
  },
  {
    path : 'user-signup',
    component : UserRegistrationComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'contact',
    component : ContactPageComponent
  },
  {
    path : 'user',
    component : UserDashboardComponent
  },
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path : 'rto-officer',
    component : RtoOfficerComponent
  },
  {
    path : 'permit',
    component : PermitComponent
  },
  {
    path : 'privacy-policy',
    component : PrivacyPolicyComponent
  },
  {
    path : 'hyperlink-policy',
    component : HyperlinkPolicyComponent
  },
  {
    path : 'view-applications',
    component : ViewApplicationComponent
  },
  {
    path : 'FAQ',
    component : FaqComponent
  },
  {
    path: 'forbidden',
    component : ForbiddenComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
  
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
