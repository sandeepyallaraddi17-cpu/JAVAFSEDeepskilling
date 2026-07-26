import {
  createReducer,
  on
} from '@ngrx/store';

import { Course } from '../../models/course.model';

import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure
} from './course.actions';


export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}


export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null
};


export const courseReducer = createReducer(

  initialCourseState,

  // When loading starts
  on(
    loadCourses,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),

  // When courses are loaded successfully
  on(
    loadCoursesSuccess,
    (state, { courses }) => ({
      ...state,
      courses: courses,
      loading: false,
      error: null
    })
  ),

  // When loading fails
  on(
    loadCoursesFailure,
    (state, { error }) => ({
      ...state,
      courses: [],
      loading: false,
      error: error
    })
  )

);