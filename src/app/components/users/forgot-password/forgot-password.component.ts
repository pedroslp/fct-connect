import { NgForm } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onResetPassword(form: NgForm) {
    this.authService.resetPassword(form.value.email)
      .then((res) => {
        window.alert('Please check your email for a password reset link')
        this.onResetPasswordRedirect()
      }).catch(err => console.log('err', err.message))
  }

  onResetPasswordRedirect(): void {
    this.router.navigate(['/user/login'])
  }
}
