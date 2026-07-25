import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
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
    },
    {
      id: 4,
      name: 'Microservices',
      code: 'MIC401',
      credits: 4,
      status: 'pending'
    },
    {
      id: 5,
      name: 'Database Management',
      code: 'DBMS501',
      credits: 4,
      status: 'passed'
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}