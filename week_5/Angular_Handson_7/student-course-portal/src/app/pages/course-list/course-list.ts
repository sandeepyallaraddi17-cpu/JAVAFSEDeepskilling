import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

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

  allCourses: Course[] = [];

  courses: Course[] = [];

  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.allCourses =
      this.courseService.getCourses();

    // Hands-On Step 71
    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    this.filterCourses();
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
    ).then(() => {
      this.filterCourses();
    });
  }


  filterCourses(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      this.courses =
        [...this.allCourses];

      return;
    }

    this.courses =
      this.allCourses.filter(course =>

        course.name
          .toLowerCase()
          .includes(search)

        ||

        course.code
          .toLowerCase()
          .includes(search)

      );
  }


  clearSearch(): void {

    this.searchTerm = '';

    this.courses =
      [...this.allCourses];

    this.router.navigate(['/courses']);
  }


  // Hands-On Step 70
  viewCourse(courseId: number): void {

    this.router.navigate([
      'courses',
      courseId
    ]);
  }
}