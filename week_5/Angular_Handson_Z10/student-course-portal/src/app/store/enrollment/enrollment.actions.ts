import {
  createAction,
  props
} from '@ngrx/store';

// Enroll a course
export const enrollInCourse = createAction(
  '[Enrollment] Enroll In Course',
  props<{
    courseId: number
  }>()
);


// Unenroll a course
export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll From Course',
  props<{
    courseId: number
  }>()
);