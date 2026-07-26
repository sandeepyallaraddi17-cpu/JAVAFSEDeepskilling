import { createAction, props } from '@ngrx/store';

import { Course } from '../../models/course.model';


// Step 93 - Request courses
export const loadCourses = createAction(
  '[Course] Load Courses'
);


// Courses loaded successfully
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);


// Course loading failed
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);