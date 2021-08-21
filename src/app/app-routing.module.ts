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
    CommonModule , RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
