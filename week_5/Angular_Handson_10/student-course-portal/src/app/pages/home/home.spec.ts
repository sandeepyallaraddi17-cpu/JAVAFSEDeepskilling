import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  of
} from 'rxjs';

import {
  HomeComponent
} from './home';

import {
  CourseService
} from '../../services/course';


describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  const courseServiceMock = {

    getCourses: () =>
      of([
        {
          id: 1,
          name: 'Java',
          code: 'JAVA101',
          credits: 4,
          status: 'passed'
        }
      ])

  };


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        HomeComponent
      ],

      providers: [

        {
          provide: CourseService,
          useValue: courseServiceMock
        }

      ]

    }).compileComponents();


    fixture =
      TestBed.createComponent(
        HomeComponent
      );

    component =
      fixture.componentInstance;

  });


  it('should create', () => {

    fixture.detectChanges();

    expect(component)
      .toBeTruthy();

  });


  it('should load available courses', () => {

    fixture.detectChanges();

    expect(
      component.availableCourses
    ).toBe(1);

  });


  it('should show enrollment message', () => {

    component.onEnrollClick();

    expect(
      component.enrollmentMessage
    ).toContain(
      'Courses'
    );

  });

});