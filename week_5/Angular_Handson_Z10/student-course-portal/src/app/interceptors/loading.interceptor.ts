import {
  inject
} from '@angular/core';

import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  finalize
} from 'rxjs';

import {
  LoadingService
} from '../services/loading';

export const loadingInterceptor:
HttpInterceptorFn = (req, next) => {

  const loadingService =
    inject(LoadingService);

  loadingService.show();

  console.log(
    'Loading started:',
    req.url
  );

  return next(req).pipe(

    finalize(() => {

      loadingService.hide();

      console.log(
        'Loading finished:',
        req.url
      );

    })

  );
};