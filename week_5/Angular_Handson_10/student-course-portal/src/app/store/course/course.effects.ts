import {
  Injectable,
  inject
} from '@angular/core';

import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';

import {
  catchError,
  map,
  of,
  switchMap
} from 'rxjs';

import {
  CourseService
} from '../../services/course';

import {
  loadCourses,
  loadCoursesFailure,
  loadCoursesSuccess
} from './course.actions';


@Injectable()
export class CourseEffects {

  private actions$ = inject(Actions);

  private courseService =
    inject(CourseService);


  loadCourses$ = createEffect(() =>

    this.actions$.pipe(

      // Step 97:
      // Listen for Load Courses
      ofType(loadCourses),

      // Call CourseService
      switchMap(() =>

        this.courseService
          .getCourses()
          .pipe(

            // API success
            map(courses =>
              loadCoursesSuccess({
                courses
              })
            ),

            // API failure
            catchError(error =>
              of(
                loadCoursesFailure({
                  error:
                    error?.message ||
                    'Failed to load courses.'
                })
              )
            )

          )

      )

    )

  );

}