import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersListComponent } from './components/admin/offers-list/offers-list.component'
import { HomeComponent } from './components/home/home.component'
import { OfferDetailsComponent } from './components/offer-details/offer-details.component'
import { OffersComponent } from './components/offers/offers.component'
import { Page404Component } from './components/page404/page404.component'
import { LoginComponent } from './components/users/login/login.component'
import { ProfileComponent } from './components/users/profile/profile.component'
import { RegisterComponent } from './components/users/register/register.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offers', component: OffersComponent }, // TODO: add a route guard, only user auth
  { path: 'offer/:id', component: OfferDetailsComponent },
  { path: 'admin/offers-list', component: OffersListComponent }, // TODO: add a route guard, only user auth
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent }, // TODO: add a route guard, only user auth
  { path: '**', component: Page404Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
