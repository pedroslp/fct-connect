import { NgForm } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string = ''

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void { }

  onResetPassword(form: NgForm) {
    this.authService.resetPassword(form.value.email)
      .then((res) => {
        this.toast.success('Please check your email for a password reset link.', 'Success')
        this.onResetPasswordRedirect()
      }).catch(err => {
        this.toast.error('Missing email', 'Error')
        console.log('err', err.message)
      })
  }

  onResetPasswordRedirect(): void {
    this.router.navigate(['/user/login'])
  }
}
