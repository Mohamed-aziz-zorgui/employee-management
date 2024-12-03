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
      imageUrl: [''], // No validation
      firstName: [''], // No validation
      lastName: [''], // No validation
      email: ['', [Validators.email]], // Optional but validated as email if provided
      salary: [''], // No validation
      dob: [''], // No validation
      contactNumber: ['', [Validators.pattern('^[0-9]*$')]], // Optional but validated as numeric if provided
      address: [''], // No validation
    });
    
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Simulate image upload to a server or convert to a Base64 URL
      const reader = new FileReader();
      reader.onload = () => {
        this.employeeForm.patchValue({ imageUrl: reader.result }); // Store the image as a URL
        this.employeeForm.get('imageUrl')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
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
