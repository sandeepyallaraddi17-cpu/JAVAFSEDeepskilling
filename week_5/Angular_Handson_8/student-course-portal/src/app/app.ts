import {
  Component,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterOutlet
} from '@angular/router';

import {
  HeaderComponent
} from './components/header/header';

import {
  LoadingService
} from './services/loading';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title =
    signal('student-course-portal');

  constructor(
    public loadingService: LoadingService
  ) {}
}