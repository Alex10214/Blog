import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FireBaseAuthResponse, User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if ( new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login (user: User): Observable<any> {
    user.returnSecureToken = true
    // @ts-ignore
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    //console.log(message)

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid emil')
        break;
    }
    return throwError(error)
  }

  logout () {
  this.setToken(null)

  }

  authenticated (): boolean {
    return !!this.token
  }

  private setToken(response: FireBaseAuthResponse | null) {
    if (response) {
      const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
