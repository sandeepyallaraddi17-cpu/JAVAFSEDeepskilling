import {
  TestBed
} from '@angular/core/testing';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import {
  CourseService
} from './course';

import {
  Course
} from '../models/course.model';


describe('CourseService', () => {

  let service: CourseService;
  let httpTestingController: HttpTestingController;

  const apiUrl =
    'http://localhost:3000/courses';


  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [

        CourseService,

        // Step 106
        provideHttpClient(),

        provideHttpClientTesting()

      ]

    });


    service =
      TestBed.inject(
        CourseService
      );


    httpTestingController =
      TestBed.inject(
        HttpTestingController
      );

  });


  afterEach(() => {

    httpTestingController.verify();

  });


  // Basic service creation test
  it('should be created', () => {

    expect(service).toBeTruthy();

  });


  // Step 107
  // Test successful HTTP GET
  it('should retrieve courses successfully', () => {

    const mockCourses: Course[] = [

      {
        id: 1,
        name: 'Java',
        code: 'JAVA101',
        credits: 4,
        status: 'passed'
      },

      {
        id: 2,
        name: 'Angular',
        code: 'ANG201',
        credits: 3,
        status: 'pending'
      }

    ];


    service
      .getCourses()
      .subscribe(courses => {

        expect(courses.length)
          .toBe(2);

        expect(courses)
          .toEqual(mockCourses);

        expect(courses[0].name)
          .toBe('Java');

      });


    const request =
      httpTestingController.expectOne(
        apiUrl
      );


    expect(request.request.method)
      .toBe('GET');


    request.flush(
      mockCourses
    );

  });


  // Additional check for existing map operator
  it('should filter courses with zero credits', () => {

    const mockCourses: Course[] = [

      {
        id: 1,
        name: 'Java',
        code: 'JAVA101',
        credits: 4,
        status: 'passed'
      },

      {
        id: 2,
        name: 'Invalid Course',
        code: 'TEST000',
        credits: 0,
        status: 'pending'
      }

    ];


    service
      .getCourses()
      .subscribe(courses => {

        expect(courses.length)
          .toBe(1);

        expect(courses[0].name)
          .toBe('Java');

      });


    const request =
      httpTestingController.expectOne(
        apiUrl
      );


    expect(request.request.method)
      .toBe('GET');


    request.flush(
      mockCourses
    );

  });


  // Step 108
  // Test HTTP error + retry(2) + catchError
  it('should handle HTTP error after retries', () => {

    let receivedError:
      Error | undefined;


    service
      .getCourses()
      .subscribe({

        next: () => {

          throw new Error(
            'Expected request to fail'
          );

        },

        error: error => {

          receivedError = error;

        }

      });


    // Initial request
    const request1 =
      httpTestingController.expectOne(
        apiUrl
      );

    request1.flush(
      'Server error',
      {
        status: 500,
        statusText:
          'Internal Server Error'
      }
    );


    // retry(2) - first retry
    const request2 =
      httpTestingController.expectOne(
        apiUrl
      );

    request2.flush(
      'Server error',
      {
        status: 500,
        statusText:
          'Internal Server Error'
      }
    );


    // retry(2) - second retry
    const request3 =
      httpTestingController.expectOne(
        apiUrl
      );

    request3.flush(
      'Server error',
      {
        status: 500,
        statusText:
          'Internal Server Error'
      }
    );


    expect(receivedError)
      .toBeTruthy();


    expect(receivedError?.message)
      .toBe(
        'Failed to load courses. Please try again.'
      );

  });

});