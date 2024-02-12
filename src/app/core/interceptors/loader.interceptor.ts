import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, Observer } from 'rxjs';
import { SHOW_LOADER_MARKER } from 'src/app/shared/models/constants';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: NgxUiLoaderService) {}

  removeRequest(req: HttpRequest<any>) {
    const requestIndex = this.requests.indexOf(req);

    if (requestIndex >= 0) {
      this.requests.splice(requestIndex, 1);
    }

    this.requests.length === 0 && this.loaderService.stop();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const showLoader = request.url.indexOf(SHOW_LOADER_MARKER) > 0;

    if (!showLoader) {
      return next.handle(request);
    }

    request = request.clone({
      url: request.url.replace(SHOW_LOADER_MARKER, ''),
    });

    this.requests.push(request);

    this.loaderService.start();

    return new Observable((observer: Observer<HttpEvent<any>>) => {
      const subscription = next.handle(request).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(request);
            observer.next(event);
          }
        },
        (error) => {
          this.removeRequest(request);
          observer.error(error);
        },
        () => {
          this.removeRequest(request);
          observer.complete();
        }
      );

      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
}
