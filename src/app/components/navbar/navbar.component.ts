import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public app_name: string = 'Fct-Connect'
  public isLogged: boolean = true

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        // console.log('user logged')
        this.isLogged = true
      } else {
        // console.log('user not logged')
        this.isLogged = false
      }
    })
  }

  onLogout() {
    this.authService.logoutUser()
  }
}
