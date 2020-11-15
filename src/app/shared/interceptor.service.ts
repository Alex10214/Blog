import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/Services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class Interceptor implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.authenticated()) {
      req = req.clone({
        setParams: {
          auth: this.authService.token
        }
      })
    }
    return next.handle(req)  // стрим
      .pipe(
      catchError( (error: HttpErrorResponse) => {
        console.log('interceptor Error', error)
        if (error.status === 401) {
          this.authService.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailer: true
            }
          })
        }
        return throwError(error)
      })
      )
  }
}
