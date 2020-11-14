import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FireBaseAuthResponse, User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

/*Работа с токенном*/

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  login (user: User): Observable<any> {
    user.returnSecureToken = true // добавляем флаг согласно документации farebase (доп инфо в интерфейсе)
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user) //ссылка на farebase в которой я указываю дальнейший ключ на мое приложение.
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)),
      )
  }

  private setToken(response: FireBaseAuthResponse | null) {
    if (response) {
      const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000) // получение времени завершения токена
      console.log(expDate)
      localStorage.setItem('fb-token', response.idToken) // сохраняю айди токена
      localStorage.setItem('fb-token-exp', expDate.toString()) // сохраняю вренмя завершения токена
    } else {
      localStorage.clear()
    }
  }

  logout () {
    this.setToken(null)
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if ( new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Invalid emil')
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

  authenticated (): boolean {
    return !!this.token
  }


}
