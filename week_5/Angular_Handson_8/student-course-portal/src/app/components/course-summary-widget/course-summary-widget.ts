import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  totalCourses = 0;

  message = '';

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {

    this.courseService
      .getCourses()
      .subscribe({

        next: (courses: Course[]) => {

          this.totalCourses = courses.length;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(
            'Unable to load courses:',
            error
          );

          this.message =
            'Unable to load courses.';

          this.cdr.detectChanges();
        }

      });
  }

  addDemoCourse(): void {

    const newCourse: Omit<Course, 'id'> = {

      name: 'Artificial Intelligence',
      code: 'AI601',
      credits: 4,
      status: 'pending'

    };

    this.courseService
      .createCourse(newCourse)
      .subscribe({

        next: (course: Course) => {

          console.log(
            'Course created:',
            course
          );

          this.message =
            `${course.name} added successfully!`;

          this.loadCourses();

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(
            'Unable to create course:',
            error
          );

          this.message =
            'Unable to add course.';

          this.cdr.detectChanges();
        }

      });
  }
}