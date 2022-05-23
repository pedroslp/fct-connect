import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'
import { UserInterface } from '../../../models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  public name: string = ''
  public email: string = ''
  public password: string = ''

  ngOnInit() { }

  onRegisterUser() {
    this.authService.registerUser(this.email, this.password)
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
  }

  onRegisterGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect()
      }).catch(err => console.log('err', err.message))
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/jobs-lists'])
  }
}
