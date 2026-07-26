import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {

  course: Course | null = null;

  students: Student[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.isLoading = false;

      this.errorMessage =
        'Invalid course ID';

      return;
    }

    this.courseService
      .getCourseById(id)
      .pipe(

        // Step 87 - switchMap
        switchMap((course: Course) => {

          this.course = course;

          console.log(
            'Selected course:',
            course
          );

          return this.enrollmentService
            .getStudentsByCourse(course.id);

        })

      )
      .subscribe({

        next: (students: Student[]) => {

          this.students = students;

          console.log(
            'Enrolled students:',
            students
          );

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(
            'Error loading course or students:',
            error
          );

          this.errorMessage =
            'Unable to load course details.';

          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }

  goBack(): void {

    this.router.navigate([
      '/courses'
    ]);
  }
}