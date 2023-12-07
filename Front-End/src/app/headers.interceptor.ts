/* eslint-disable no-undef */
import {Injectable} from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('tokens')}`
      }
    })

    return next.handle(request)
  }
}
