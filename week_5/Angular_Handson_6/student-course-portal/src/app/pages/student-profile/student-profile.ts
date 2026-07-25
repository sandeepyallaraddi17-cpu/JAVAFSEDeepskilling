import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification';

@Component({
  selector: 'app-student-profile',
  standalone: true,

  imports: [
    CommonModule,
    NotificationComponent
  ],

  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {

  constructor(
    private enrollmentService: EnrollmentService
  ) {}

  get enrolledCourses(): Course[] {
    return this.enrollmentService.getEnrolledCourses();
  }
}