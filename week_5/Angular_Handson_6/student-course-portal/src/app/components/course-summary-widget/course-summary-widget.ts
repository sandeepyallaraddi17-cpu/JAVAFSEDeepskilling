import { Component } from '@angular/core';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget {

  constructor(public courseService: CourseService) {}

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  addDemoCourse(): void {

    const courses = this.courseService.getCourses();

    const alreadyExists =
      courses.some(course => course.code === 'AI601');

    if (!alreadyExists) {

      this.courseService.addCourse({
        id: 6,
        name: 'Artificial Intelligence',
        code: 'AI601',
        credits: 4,
        status: 'pending'
      });

    }
  }
}