import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = ''
  public password: string = ''
  public isError = false

  constructor(public afsAuth: AngularFireAuth, private router: Router, private authService: AuthService, private toast: ToastrService) { }

  ngOnInit() { }

  onLogin(form: NgForm): void {
    if (form.valid) {
      this.authService.loginEmailUser(this.email, this.password)
        .then((res) => {
          this.onLoginRedirect()
        })
        .catch((err) => this.validateForm())
    } else {
      this.validateForm()
    }
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect()
      }).catch(err => {
        this.toast.error('Something went wrong', 'Error')
        console.log('err', err.message)
      })
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['/'])
  }

  validateForm(): void {
    this.isError = true
    setTimeout(() => {
      this.isError = false
    }, 3000)
  }
}
