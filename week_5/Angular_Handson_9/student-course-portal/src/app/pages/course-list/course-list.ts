import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Store
} from '@ngrx/store';

import {
  Observable,
  map
} from 'rxjs';

import {
  CourseCardComponent
} from '../../components/course-card/course-card';

import {
  CourseService
} from '../../services/course';

import {
  Course
} from '../../models/course.model';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesError,
  selectCoursesLoading
} from '../../store/course/course.selectors';


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

  courses$!: Observable<Course[]>;

  loading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  searchTerm = '';


  constructor(
    private store: Store,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.searchTerm =
      this.route.snapshot
        .queryParamMap
        .get('search') || '';

    this.loading$ =
      this.store.select(
        selectCoursesLoading
      );

    this.error$ =
      this.store.select(
        selectCoursesError
      );

    this.configureCoursesObservable();

    // Hands-On 9:
    // Component dispatches action instead of
    // directly calling getCourses().
    this.store.dispatch(
      loadCourses()
    );
  }


  configureCoursesObservable(): void {

    this.courses$ =
      this.store
        .select(selectAllCourses)
        .pipe(

          map((courses: Course[]) => {

            const search =
              this.searchTerm
                .trim()
                .toLowerCase();

            if (!search) {
              return courses;
            }

            return courses.filter(
              course =>

                course.name
                  .toLowerCase()
                  .includes(search)

                ||

                course.code
                  .toLowerCase()
                  .includes(search)
            );

          })

        );

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

    this.configureCoursesObservable();
  }


  clearSearch(): void {

    this.searchTerm = '';

    this.router.navigate([
      '/courses'
    ]);

    this.configureCoursesObservable();
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

          // Refresh NgRx state after deletion
          this.store.dispatch(
            loadCourses()
          );
        },

        error: error => {

          console.error(
            'Unable to delete course:',
            error
          );

        }

      });
  }
}