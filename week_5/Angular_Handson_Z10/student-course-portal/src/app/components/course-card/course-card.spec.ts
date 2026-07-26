import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SimpleChange
} from '@angular/core';

import {
  provideMockStore,
  MockStore
} from '@ngrx/store/testing';

import { vi } from 'vitest';

import {
  CourseCardComponent
} from './course-card';

import {
  Course
} from '../../models/course.model';

import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';


describe('CourseCardComponent', () => {

  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;


  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    status: 'passed'
  };


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        CourseCardComponent
      ],

      providers: [

        provideMockStore({
          selectors: [

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
        CourseCardComponent
      );


    component =
      fixture.componentInstance;


    component.course =
      mockCourse;

  });


  // Step 102
  // Verify component creation
  it('should create', () => {

    fixture.detectChanges();

    expect(component)
      .toBeTruthy();

  });


  // Step 103
  // Verify @Input rendering
  it('should render course name', () => {

    fixture.detectChanges();


    const compiled =
      fixture.nativeElement;


    const heading =
      compiled.querySelector('h3');


    expect(
      heading?.textContent
    ).toContain(
      'Data Structures'
    );

  });


  // Step 104
  // Verify Enroll action
  it('should dispatch enroll action when Enroll is clicked', () => {

    fixture.detectChanges();


    const dispatchSpy =
      vi.spyOn(
        store,
        'dispatch'
      );


    const button =
      fixture.nativeElement
        .querySelector(
          '.enroll-button'
        );


    expect(button)
      .toBeTruthy();


    expect(
      button.textContent
    ).toContain(
      'Enroll'
    );


    button.click();


    expect(
      dispatchSpy
    ).toHaveBeenCalledWith(

      enrollInCourse({
        courseId: mockCourse.id
      })

    );

  });


  // Additional NgRx enrollment test
  it('should dispatch unenroll action for enrolled course', () => {

    store.overrideSelector(
      selectEnrolledIds,
      [mockCourse.id]
    );


    store.refreshState();


    component.ngOnChanges({

      course:
        new SimpleChange(
          undefined,
          mockCourse,
          true
        )

    });


    fixture.detectChanges();


    const dispatchSpy =
      vi.spyOn(
        store,
        'dispatch'
      );


    const button =
      fixture.nativeElement
        .querySelector(
          '.enroll-button'
        );


    expect(button)
      .toBeTruthy();


    expect(
      button.textContent?.trim()
    ).toBe(
      'Unenroll'
    );


    button.click();


    expect(
      dispatchSpy
    ).toHaveBeenCalledWith(

      unenrollFromCourse({
        courseId: mockCourse.id
      })

    );

  });


  // Step 105
  // Verify ngOnChanges
  it('should call console.log in ngOnChanges', () => {

    const consoleSpy =
      vi.spyOn(
        console,
        'log'
      );


    component.ngOnChanges({

      course:
        new SimpleChange(
          undefined,
          mockCourse,
          true
        )

    });


    expect(
      consoleSpy
    ).toHaveBeenCalled();


    expect(
      component.enrolled$
    ).toBeTruthy();

  });

});