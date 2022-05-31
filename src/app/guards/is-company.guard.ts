import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthService } from '../services/auth.service'
import { take, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IsCompanyGuard implements CanActivate {
  public isCompany: any = null
  public userUid: string = ''

  constructor(private afsAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['/user/login'])
        } else {
          this.authService.isAuthenticated().subscribe(auth => {
            this.userUid = auth?.uid!
            this.authService.isCompany(this.userUid).subscribe(company => {
              if (!company?.roles.company) {
                this.router.navigate(['/'])
              }
            })
          })
        }
      }))
  }

}
