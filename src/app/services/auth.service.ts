import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map } from 'rxjs/operators'
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afsAuth: AngularFireAuth) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      )
    })
  }

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      )
    })
  }

  loginGoogleUser() {
    return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logoutUser() {
    return this.afsAuth.signOut()
  }

  isAuthenticated() {
    return this.afsAuth.authState.pipe(map((auth) => auth))
  }
}
