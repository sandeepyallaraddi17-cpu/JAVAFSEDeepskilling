import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  provideStore,
  provideState
} from '@ngrx/store';

import {
  provideEffects
} from '@ngrx/effects';

import {
  provideStoreDevtools
} from '@ngrx/store-devtools';

import {
  routes
} from './app.routes';

import {
  authInterceptor
} from './interceptors/auth.interceptor';

import {
  errorHandlerInterceptor
} from './interceptors/error-handler.interceptor';

import {
  loadingInterceptor
} from './interceptors/loading.interceptor';

import {
  courseReducer
} from './store/course/course.reducer';

import {
  CourseEffects
} from './store/course/course.effects';

import {
  enrollmentReducer
} from './store/enrollment/enrollment.reducer';


export const appConfig:
ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    // Existing Hands-On 8 HTTP configuration
    provideHttpClient(

      withInterceptors([

        authInterceptor,

        errorHandlerInterceptor,

        loadingInterceptor

      ])

    ),

    // Hands-On 9 - NgRx root store
    provideStore(),

    // Course state
    provideState(
      'course',
      courseReducer
    ),

    // Enrollment state
    provideState(
      'enrollment',
      enrollmentReducer
    ),

    // NgRx Effects
    provideEffects(
      CourseEffects
    ),

    // Redux DevTools
    provideStoreDevtools({
      maxAge: 25
    })

  ]

};