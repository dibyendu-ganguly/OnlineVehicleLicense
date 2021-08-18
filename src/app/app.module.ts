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
    ContactPageComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
