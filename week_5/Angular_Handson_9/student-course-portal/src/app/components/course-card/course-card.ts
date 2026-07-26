import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';

import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';


@Component({
  selector: 'app-course-card',
  standalone: true,

  imports: [
    CommonModule,
    Highlight,
    CreditLabelPipe
  ],

  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {

  @Input() course!: Course;

  isExpanded = false;

  enrolled$!: Observable<boolean>;


  constructor(
    private store: Store
  ) {}


  ngOnChanges(
    changes: SimpleChanges
  ): void {

    console.log(
      'Course changed:',
      changes['course']
    );

    if (this.course) {

      this.enrolled$ =
        this.store
          .select(selectEnrolledIds)
          .pipe(

            map(ids =>
              ids.includes(this.course.id)
            )

          );
    }
  }


  toggleEnrollment(
    enrolled: boolean
  ): void {

    if (enrolled) {

      this.store.dispatch(
        unenrollFromCourse({
          courseId: this.course.id
        })
      );

    } else {

      this.store.dispatch(
        enrollInCourse({
          courseId: this.course.id
        })
      );

    }
  }


  toggleDetails(): void {

    this.isExpanded =
      !this.isExpanded;
  }


  getCardClasses(
    enrolled: boolean
  ) {

    return {
      'card-enrolled': enrolled,
      'card-full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}