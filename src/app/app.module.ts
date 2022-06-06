import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { OffersListComponent } from './components/company/offers-list/offers-list.component'
import { OfferDetailsComponent } from './components/offer-details/offer-details.component'
import { HomeComponent } from './components/home/home.component'
import { AddModalComponent } from './components/modal/add-modal.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { LoginComponent } from './components/users/login/login.component'
import { ProfileComponent } from './components/users/profile/profile.component'
import { RegisterComponent } from './components/users/register/register.component'
import { Page404Component } from './components/page404/page404.component'
import { FooterComponent } from './components/footer/footer.component'
import { FormsModule } from '@angular/forms'
import { environment } from '../environments/environment'

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component'

@NgModule({
  declarations: [
    AppComponent,
    OffersListComponent,
    OfferDetailsComponent,
    HomeComponent,
    AddModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    FooterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
