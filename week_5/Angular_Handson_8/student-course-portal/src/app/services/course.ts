import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  catchError,
  map,
  retry,
  tap,
  throwError
} from 'rxjs';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl =
    'http://localhost:3000/courses';

  constructor(
    private http: HttpClient
  ) {}

  // GET all courses
  // Task 2: map + tap + retry + catchError
  getCourses(): Observable<Course[]> {

    return this.http
      .get<Course[]>(this.apiUrl)
      .pipe(

        // Step 83
        map((courses: Course[]) =>
          courses.filter(
            course => course.credits > 0
          )
        ),

        // Step 85
        tap((courses: Course[]) =>
          console.log(
            'Courses loaded:',
            courses.length
          )
        ),

        // Step 86
        retry(2),

        // Step 84
        catchError(error => {

          console.error(
            'Error loading courses:',
            error
          );

          return throwError(
            () => new Error(
              'Failed to load courses. Please try again.'
            )
          );

        })

      );
  }


  // GET course by ID
  getCourseById(
    id: number | string
  ): Observable<Course> {

    return this.http
      .get<Course>(
        `${this.apiUrl}/${id}`
      )
      .pipe(

        tap(course =>
          console.log(
            'Course loaded:',
            course
          )
        ),

        retry(2),

        catchError(error => {

          console.error(
            'Error loading course:',
            error
          );

          return throwError(
            () => new Error(
              'Failed to load course.'
            )
          );

        })

      );
  }


  // POST
  createCourse(
    course: Omit<Course, 'id'>
  ): Observable<Course> {

    return this.http
      .post<Course>(
        this.apiUrl,
        course
      )
      .pipe(

        tap(createdCourse =>
          console.log(
            'Course created:',
            createdCourse
          )
        ),

        catchError(error => {

          console.error(
            'Error creating course:',
            error
          );

          return throwError(
            () => new Error(
              'Failed to create course.'
            )
          );

        })

      );
  }


  // PUT
  updateCourse(
    course: Course
  ): Observable<Course> {

    return this.http
      .put<Course>(
        `${this.apiUrl}/${course.id}`,
        course
      )
      .pipe(

        tap(updatedCourse =>
          console.log(
            'Course updated:',
            updatedCourse
          )
        ),

        catchError(error => {

          console.error(
            'Error updating course:',
            error
          );

          return throwError(
            () => new Error(
              'Failed to update course.'
            )
          );

        })

      );
  }


  // DELETE
  deleteCourse(
    id: number | string
  ): Observable<void> {

    return this.http
      .delete<void>(
        `${this.apiUrl}/${id}`
      )
      .pipe(

        tap(() =>
          console.log(
            'Course deleted:',
            id
          )
        ),

        catchError(error => {

          console.error(
            'Error deleting course:',
            error
          );

          return throwError(
            () => new Error(
              'Failed to delete course.'
            )
          );

        })

      );
  }
}