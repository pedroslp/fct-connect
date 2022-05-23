import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afsAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  public email: string = '';
  public password: string = '';

  ngOnInit() { }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect()
      }).catch(err => console.log('err', err.message))
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect()
        console.log(res)
      }).catch(err => console.log('err', err.message))
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/jobs-lists'])
  }
}
