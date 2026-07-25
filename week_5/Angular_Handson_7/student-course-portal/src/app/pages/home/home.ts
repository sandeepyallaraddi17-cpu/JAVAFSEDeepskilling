import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from
  '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [
    CommonModule,
    CourseSummaryWidget
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  enrollmentMessage = '';

  constructor(
    private courseService: CourseService
  ) {}

  get availableCourses(): number {
    return this.courseService.getCourses().length;
  }

  onEnrollClick(): void {
    this.enrollmentMessage =
      'Courses are available in the Courses section. Select Courses from the navigation menu to enroll.';
  }
}