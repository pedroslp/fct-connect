import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public name: string = ''
  public email: string = ''
  public password: string = ''
  public company: boolean = false
  public isError = false

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onRegisterUser(form: NgForm) {
    if (form.valid) {
      this.authService.registerUser(this.email, this.password, this.company)
        .then((res) => {
          this.authService.isAuthenticated().subscribe(user => {
            if (user) {
              user.updateProfile({
                displayName: this.name,
              }).catch((err) => console.log('err', err))
            }
          })
          this.onLoginRedirect()
        })
        .catch((err) => {
          console.log('err', err.message)
        })
    } else {
      this.validateForm()
    }
  }

  onRegisterGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect()
      }).catch(err => console.log('err', err.message))
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
