import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseCardComponent } from
  '../../components/course-card/course-card';

import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    CourseCardComponent
  ],

  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  allCourses: Course[] = [];

  courses: Course[] = [];

  searchTerm = '';

  errorMessage = '';

  isLoading = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.searchTerm =
      this.route.snapshot
        .queryParamMap
        .get('search') || '';

    this.loadCourses();
  }

  loadCourses(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.courseService
      .getCourses()
      .subscribe({

        next: (courses: Course[]) => {

          this.allCourses = courses;

          this.filterCourses();

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(
            'Unable to load courses:',
            error
          );

          this.errorMessage =
            'Unable to load courses';

          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }

  searchCourses(): void {

    const search =
      this.searchTerm.trim();

    this.router.navigate(
      ['/courses'],
      {
        queryParams: {
          search: search || null
        }
      }
    );

    this.filterCourses();
  }

  filterCourses(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      this.courses =
        [...this.allCourses];

      return;
    }

    this.courses =
      this.allCourses.filter(
        course =>

          course.name
            .toLowerCase()
            .includes(search)

          ||

          course.code
            .toLowerCase()
            .includes(search)
      );
  }

  clearSearch(): void {

    this.searchTerm = '';

    this.courses =
      [...this.allCourses];

    this.router.navigate([
      '/courses'
    ]);
  }

  viewCourse(
    courseId: number
  ): void {

    this.router.navigate([
      'courses',
      courseId
    ]);
  }

  deleteCourse(
    course: Course
  ): void {

    const confirmed =
      window.confirm(
        `Delete ${course.name}?`
      );

    if (!confirmed) {
      return;
    }

    this.courseService
      .deleteCourse(course.id)
      .subscribe({

        next: () => {

          console.log(
            'Course deleted:',
            course.id
          );

          this.loadCourses();
        },

        error: error => {

          console.error(
            'Unable to delete course:',
            error
          );

          this.errorMessage =
            'Unable to delete course';

          this.cdr.detectChanges();
        }

      });
  }
}