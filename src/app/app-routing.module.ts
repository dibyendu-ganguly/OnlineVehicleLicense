import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


const routes: Routes = [
    { path: '', component: CardsComponent },
    { path: 'user-signup', component: UserRegistrationComponent},
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactPageComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }