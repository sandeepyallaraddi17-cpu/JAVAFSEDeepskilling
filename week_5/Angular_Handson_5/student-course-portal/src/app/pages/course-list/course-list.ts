import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent {

  courses = [
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
  },
  {
    id: 3,
    name: 'Spring Boot',
    code: 'SPR301',
    credits: 5,
    status: 'failed'
  }
];
  

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enroll requested for Course ID:', courseId);
  }

}