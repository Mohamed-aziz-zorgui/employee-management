import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, Employee } from '../data.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = [
    'imageUrl',
    'firstName',
    'lastName',
    'email',
    'salary',
    'dob',
    'contactNumber',
    'address',
    'actions',
  ];  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService, private dialog: MatDialog,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dataService.fetchEmployees().subscribe((employees) => {
      this.dataSource.data = employees;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newEmployee: Employee = { id: Math.floor(Math.random() * 1000), ...result };
        this.dataSource.data = [...this.dataSource.data, newEmployee];
      }
    });
  }

  deleteEmployee(id: number): void {
    this.dataSource.data = this.dataSource.data.filter((employee) => employee.id !== id);
    this.snackBar.open('Employee deleted successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-toast']
    });
  }
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
