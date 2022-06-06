import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersListComponent } from './components/company/offers-list/offers-list.component'
import { HomeComponent } from './components/home/home.component'
import { OfferDetailsComponent } from './components/offer-details/offer-details.component'
import { Page404Component } from './components/page404/page404.component'
import { LoginComponent } from './components/users/login/login.component'
import { ProfileComponent } from './components/users/profile/profile.component'
import { RegisterComponent } from './components/users/register/register.component'
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component'
import { AuthGuard } from './guards/auth.guard';
import { IsCompanyGuard } from './guards/is-company.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offer/:id', component: OfferDetailsComponent, canActivate: [AuthGuard] },
  { path: 'company/offers-list', component: OffersListComponent, canActivate: [AuthGuard, IsCompanyGuard] },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/forgot-password', component: ForgotPasswordComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
