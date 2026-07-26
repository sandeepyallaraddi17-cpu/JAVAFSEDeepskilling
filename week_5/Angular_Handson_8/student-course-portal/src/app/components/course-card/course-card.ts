import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

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

  constructor(
    private enrollmentService: EnrollmentService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      'Course changed:',
      changes['course']
    );
  }

  toggleEnrollment(): void {

    if (this.isEnrolled()) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }

  }

  isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(
      this.course.id
    );
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  get cardClasses() {
    return {
      'card-enrolled': this.isEnrolled(),
      'card-full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}