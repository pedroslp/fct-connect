import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { take, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afsAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['/user/login'])
        }
      }))
  }
}
