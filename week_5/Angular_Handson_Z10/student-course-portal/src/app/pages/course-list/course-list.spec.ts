import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  provideMockStore,
  MockStore
} from '@ngrx/store/testing';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  CourseListComponent
} from './course-list';

import {
  Course
} from '../../models/course.model';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';


describe('CourseListComponent', () => {

  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;


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


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        CourseListComponent
      ],

      providers: [

        provideRouter([]),

        provideHttpClient(),

        // Step 109
        // Mock NgRx Store
        provideMockStore({
          selectors: [

            {
              selector: selectAllCourses,
              value: mockCourses
            },

            {
              selector: selectCoursesLoading,
              value: false
            },

            {
              selector: selectCoursesError,
              value: null
            },

            {
              selector: selectEnrolledIds,
              value: []
            }

          ]
        })

      ]

    }).compileComponents();


    store =
      TestBed.inject(MockStore);


    fixture =
      TestBed.createComponent(
        CourseListComponent
      );


    component =
      fixture.componentInstance;

  });


  // Basic component test
  it('should create', () => {

    fixture.detectChanges();

    expect(component)
      .toBeTruthy();

  });


  // Step 109
  // Verify courses come from MockStore
  it('should receive mock courses from the store', () => {

    fixture.detectChanges();


    let receivedCourses: Course[] = [];


    component.courses$
      .subscribe(courses => {

        receivedCourses =
          courses;

      });


    expect(
      receivedCourses.length
    ).toBe(2);


    expect(
      receivedCourses
    ).toEqual(
      mockCourses
    );


    expect(
      receivedCourses[0].name
    ).toBe(
      'Java'
    );


    expect(
      receivedCourses[1].name
    ).toBe(
      'Angular'
    );

  });


  // Step 109
  // Verify courses are rendered
  it('should render mock courses', () => {

    fixture.detectChanges();


    const compiled =
      fixture.nativeElement;


    expect(
      compiled.textContent
    ).toContain(
      'Java'
    );


    expect(
      compiled.textContent
    ).toContain(
      'Angular'
    );

  });


  // Step 110
  // Loading = true
  it('should display loading state when loading is true', () => {

    const loadingSelector =
      store.overrideSelector(
        selectCoursesLoading,
        true
      );


    loadingSelector.setResult(
      true
    );


    store.refreshState();

    fixture.detectChanges();


    const compiled =
      fixture.nativeElement;


    expect(
      compiled.textContent
    ).toContain(
      'Loading courses...'
    );

  });


  // Step 110
  // Loading true -> false
  it('should hide loading state when loading becomes false', () => {

    const loadingSelector =
      store.overrideSelector(
        selectCoursesLoading,
        true
      );


    loadingSelector.setResult(
      true
    );


    store.refreshState();

    fixture.detectChanges();


    let compiled =
      fixture.nativeElement;


    expect(
      compiled.textContent
    ).toContain(
      'Loading courses...'
    );


    loadingSelector.setResult(
      false
    );


    store.refreshState();

    fixture.detectChanges();


    compiled =
      fixture.nativeElement;


    expect(
      compiled.textContent
    ).not.toContain(
      'Loading courses...'
    );

  });

});