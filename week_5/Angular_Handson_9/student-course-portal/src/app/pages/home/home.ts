import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  enrollmentMessage = '';

  availableCourses = 0;

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.courseService
      .getCourses()
      .subscribe({

        next: courses => {
          this.availableCourses = courses.length;
        },

        error: err => {
          console.error(
            'Unable to load courses',
            err
          );
        }

      });
  }

  onEnrollClick(): void {

    this.enrollmentMessage =
      'Courses are available in the Courses section. Select Courses from the navigation menu to enroll.';
  }
}