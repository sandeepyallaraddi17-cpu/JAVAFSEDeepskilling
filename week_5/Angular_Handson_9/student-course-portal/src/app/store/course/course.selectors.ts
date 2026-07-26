import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import {
  CourseState
} from './course.reducer';


// Select complete Course state
export const selectCourseState =
  createFeatureSelector<CourseState>(
    'course'
  );


// Select all courses
export const selectAllCourses =
  createSelector(
    selectCourseState,
    state => state.courses
  );


// Select loading status
export const selectCoursesLoading =
  createSelector(
    selectCourseState,
    state => state.loading
  );


// Select error message
export const selectCoursesError =
  createSelector(
    selectCourseState,
    state => state.error
  );