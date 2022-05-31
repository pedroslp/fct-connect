import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map, switchMap } from 'rxjs/operators'
import firebase from 'firebase/compat/app'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { UserInterface } from '../models/user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password).
        then(userData => {
          resolve(userData)
          this.updateUserData(userData.user)
        }).catch(err => reject(err))
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
      .then(credentials => this.updateUserData(credentials.user))
  }

  logoutUser() {
    return this.afsAuth.signOut()
  }

  isAuthenticated() {
    return this.afsAuth.authState.pipe(map((auth) => auth))
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        company: false
      }
    }
    return userRef.set(data, { merge: true })
  }

  isCompany(userId) {
    return this.afs.doc<UserInterface>(`users/${userId}`).valueChanges()
  }
}
