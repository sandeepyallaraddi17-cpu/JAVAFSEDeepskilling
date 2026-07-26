import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor:
HttpInterceptorFn = (req, next) => {

  const authReq = req.clone({
    setHeaders: {
      Authorization:
        'Bearer token-12345'
    }
  });

  console.log(
    'Auth Interceptor:',
    authReq.url
  );

  return next(authReq);
};