import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  forkJoin,
  of,
  map
} from 'rxjs';

import { CourseService } from './course';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourseIds: number[] = [];

  private studentsUrl =
    'http://localhost:3000/students';

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}


  // Enroll in a course
  enroll(courseId: number): void {

    if (!this.enrolledCourseIds.includes(courseId)) {

      this.enrolledCourseIds.push(courseId);

    }
  }


  // Unenroll from a course
  unenroll(courseId: number): void {

    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(
        id => id !== courseId
      );
  }


  // Check whether course is enrolled
  isEnrolled(courseId: number): boolean {

    return this.enrolledCourseIds.includes(
      courseId
    );
  }


  // Get all courses currently enrolled
  getEnrolledCourses(): Observable<Course[]> {

    if (this.enrolledCourseIds.length === 0) {

      return of([]);

    }

    const requests =
      this.enrolledCourseIds.map(
        id =>
          this.courseService.getCourseById(id)
      );

    return forkJoin(requests);
  }


  // Step 87
  // Get students belonging to selected course
  getStudentsByCourse(
    courseId: number | string
  ): Observable<Student[]> {

    console.log(
      'Requested Course ID:',
      courseId,
      'Type:',
      typeof courseId
    );

    return this.http
      .get<Student[]>(this.studentsUrl)
      .pipe(

        map((students: Student[]) => {

          console.log(
            'ALL STUDENTS FROM API:',
            students
          );

          console.log(
            'STUDENT COURSE IDS:',
            students.map(student => ({
              name: student.name,
              courseId: student.courseId,
              type: typeof student.courseId
            }))
          );

          const filteredStudents =
            students.filter(
              student =>
                String(student.courseId) ===
                String(courseId)
            );

          console.log(
            'FILTERED STUDENTS:',
            filteredStudents
          );

          return filteredStudents;

        })

      );
  }
}