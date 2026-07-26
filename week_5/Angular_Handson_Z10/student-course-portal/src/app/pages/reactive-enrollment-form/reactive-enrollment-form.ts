import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {
  CanComponentDeactivate
} from '../../guards/unsaved-changes-guard';


export function noCourseCode(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;

  if (
    value &&
    value.toString().toUpperCase().startsWith('XX')
  ) {
    return {
      noCourseCode: true
    };
  }

  return null;
}


export function simulateEmailCheck():
AsyncValidatorFn {

  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> => {

    return new Promise(resolve => {

      setTimeout(() => {

        const email =
          control.value;

        if (
          email &&
          email.includes('test@')
        ) {

          resolve({
            emailTaken: true
          });

        } else {

          resolve(null);

        }

      }, 800);

    });
  };
}


@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm
implements OnInit, CanComponentDeactivate {

  enrollForm!: FormGroup;

  submitted = false;


  constructor(
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {

    this.enrollForm =
      this.fb.group({

        studentName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

        studentEmail:
          this.fb.control(
            '',
            [
              Validators.required,
              Validators.email
            ],
            [
              simulateEmailCheck()
            ]
          ),

        courseId: [
          '',
          [
            Validators.required,
            noCourseCode
          ]
        ],

        preferredSemester: [
          'Odd',
          Validators.required
        ],

        agreeToTerms: [
          false,
          Validators.requiredTrue
        ],

        additionalCourses:
          this.fb.array([])

      });
  }


  get additionalCourses(): FormArray {

    return this.enrollForm.get(
      'additionalCourses'
    ) as FormArray;
  }


  addCourse(): void {

    const courseGroup =
      this.fb.group({

        courseId: [
          '',
          [
            Validators.required,
            noCourseCode
          ]
        ]

      });

    this.additionalCourses.push(
      courseGroup
    );

    this.submitted = false;
  }


  removeCourse(index: number): void {

    this.additionalCourses.removeAt(
      index
    );

    this.submitted = false;
  }


  onSubmit(): void {

    if (this.enrollForm.valid) {

      console.log(
        'Form Value:',
        this.enrollForm.value
      );

      this.submitted = true;

      this.enrollForm.markAsPristine();

    } else {

      this.submitted = false;

      this.enrollForm.markAllAsTouched();
    }
  }


  canDeactivate(): boolean {

    if (
      this.enrollForm &&
      this.enrollForm.dirty
    ) {

      return window.confirm(
        'You have unsaved changes. Leave?'
      );
    }

    return true;
  }
}