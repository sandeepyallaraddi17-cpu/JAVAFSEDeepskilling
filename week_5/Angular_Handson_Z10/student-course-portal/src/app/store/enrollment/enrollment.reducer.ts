import {
  createReducer,
  on
} from '@ngrx/store';

import {
  enrollInCourse,
  unenrollFromCourse
} from './enrollment.actions';


export interface EnrollmentState {
  enrolledCourseIds: number[];
}


// Initial enrollment state
export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: []
};


// Enrollment reducer
export const enrollmentReducer = createReducer(

  initialEnrollmentState,

  // Add course ID when enrolling
  on(
    enrollInCourse,
    (state, { courseId }): EnrollmentState => {

      // Avoid duplicate enrollment
      if (
        state.enrolledCourseIds.includes(courseId)
      ) {
        return state;
      }

      return {
        ...state,

        enrolledCourseIds: [
          ...state.enrolledCourseIds,
          courseId
        ]
      };
    }
  ),

  // Remove course ID when unenrolling
  on(
    unenrollFromCourse,
    (state, { courseId }): EnrollmentState => ({
      ...state,

      enrolledCourseIds:
        state.enrolledCourseIds.filter(
          id => id !== courseId
        )
    })
  )

);