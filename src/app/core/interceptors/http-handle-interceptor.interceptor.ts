import { HttpInterceptorFn } from '@angular/common/http';

export const httpHandleInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
