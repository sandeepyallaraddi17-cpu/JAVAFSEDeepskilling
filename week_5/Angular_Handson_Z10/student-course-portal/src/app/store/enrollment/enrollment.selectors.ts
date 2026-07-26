import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import {
  EnrollmentState
} from './enrollment.reducer';

import {
  Course
} from '../../models/course.model';

import {
  selectAllCourses
} from '../course/course.selectors';


// Select the complete enrollment state
export const selectEnrollmentState =
  createFeatureSelector<EnrollmentState>(
    'enrollment'
  );


// Select enrolled course IDs
export const selectEnrolledIds =
  createSelector(

    selectEnrollmentState,

    state =>
      state.enrolledCourseIds

  );


// Cross-slice selector:
// combines Course State + Enrollment State
export const selectEnrolledCourses =
  createSelector(

    selectAllCourses,
    selectEnrolledIds,

    (
      courses: Course[],
      enrolledIds: number[]
    ) =>
      courses.filter(
        course =>
          enrolledIds.includes(course.id)
      )

  );