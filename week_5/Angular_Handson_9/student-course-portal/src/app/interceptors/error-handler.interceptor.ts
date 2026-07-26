import { inject } from '@angular/core';

import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { Router } from '@angular/router';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorHandlerInterceptor:
HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError(
      (error: HttpErrorResponse) => {

        console.error(
          'Global HTTP Error:',
          error
        );

        // Handle 401 Unauthorized
        if (error.status === 401) {

          console.error(
            '401 Unauthorized - Navigating to Home'
          );

          router.navigate(['/']);

        }

        // Handle 500 Server Error
        else if (error.status === 500) {

          console.error(
            '500 Internal Server Error'
          );

          alert(
            'A server error occurred. Please try again later.'
          );

        }

        return throwError(
          () => error
        );
      }
    )

  );
};