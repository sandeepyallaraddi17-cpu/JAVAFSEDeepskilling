import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  submitted = false;

  enrollment = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: '',
    agreeToTerms: false
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Enrollment Form Submitted');
      console.log(form.value);
      console.log('Form Valid:', form.valid);

      this.submitted = true;
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm({
      studentName: '',
      studentEmail: '',
      courseId: null,
      preferredSemester: '',
      agreeToTerms: false
    });

    this.submitted = false;
  }
}