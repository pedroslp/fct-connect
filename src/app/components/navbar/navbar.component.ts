import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public app_name: string = 'Fct-Connect'
  public isLogged: boolean = true
  public isCompany: any = null
  public userUid: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        this.isLogged = true
        this.userUid = auth.uid
        this.authService.isCompany(this.userUid).subscribe(userRole => {
          this.isCompany = Object.assign({}, userRole?.roles.company).hasOwnProperty('company')
        })
      } else {
        this.isLogged = false
      }
    })
  }

  onLogout() {
    this.authService.logoutUser()
  }
}
