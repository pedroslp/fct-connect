import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../services/auth.service'
import { UserInterface } from '../../../models/user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserInterface = {
    name: '',
    email: '',
    roles: {}
  }

  constructor(private authService: AuthService) { }

  public providerId: string = 'null'

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(user => {
      if (user) {
        this.user.name = user.displayName!
        this.user.email = user.email!
        this.providerId = user.providerData[0]!.providerId
      }
    })
  }
}
