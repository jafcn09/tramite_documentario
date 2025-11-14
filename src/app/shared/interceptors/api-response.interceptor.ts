import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(event => {
       
        if (event instanceof HttpResponse) {
          const response = event.body as any;

          if (response && typeof response === 'object' && 'success' in response && 'data' in response) {
        
            const unwrappedData = response.data;
            return event.clone({ body: unwrappedData });
          }
        }
        return event;
      })
    );
  }
}