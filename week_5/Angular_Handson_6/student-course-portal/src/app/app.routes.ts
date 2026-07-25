import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { StudentProfile } from './pages/student-profile/student-profile';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'courses',
    component: CourseListComponent
  },

  {
    path: 'profile',
    component: StudentProfile
  },

  {
    path: 'enroll',
    component: EnrollmentForm
  },

  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm
  }

];