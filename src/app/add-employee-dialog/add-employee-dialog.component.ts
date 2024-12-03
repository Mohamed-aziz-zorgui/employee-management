import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent {
  employeeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.min(0)]],
      dob: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[+]?([0-9]*[ -]*)+$')]],
      address: ['', Validators.required],
    });
  }
  

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
      this.snackBar.open('Employee added successfully!', 'Close', {
        duration: 3000,  // Durée de la notification en millisecondes
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['success-toast']
      });
    }
    else {
      this.snackBar.open('Please fill all the required fields!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-toast']
      });
  }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
