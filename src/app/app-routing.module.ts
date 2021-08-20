import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CardsComponent } from './cards/cards.component';

const routes : Routes = [
  {
    path : '',
    component : CardsComponent
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
