import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbDateStruct, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { IEmployee } from '../employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  bd: NgbDateStruct;
  desc: NgbDateStruct;
  dateBd: string;
  dateDesc: string;
  faCal = faCalendar;
  groupHasError = true;
  dateDescHasError = true;
  dateBdHasError = true;
  employees = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this._employeeService.getEmployee()
      .subscribe(data => this.employees = data);
  }

  // onSelectDateBd(date: NgbDateStruct) {
  //   if (date != null) {
  //     // this.bd = date;  
  //     this.dateBd = this.ngbDateParserFormatter.format(date);
  //   }
  // }

  // onSelectDateDesc(date: NgbDateStruct) {
  //   if (date != null) {
  //     // this.bd = date;  
  //     this.dateDesc = this.ngbDateParserFormatter.format(date);
  //   }
  // }

  validateGroup(value) {
    if (value === 'default') {
      this.groupHasError = true;
    } else {
      this.groupHasError = false;
    }
  }

  checkDateDesc(value) {
    let today = new Date()
    let selectedDate = new Date(value)
    if (selectedDate >= today) {
      this.dateDescHasError = true;
    } else {
      this.dateDescHasError = false;
    }
  }

  checkDateBd(value) {
    let today = new Date()
    let selectedDate = new Date(value)
    if (selectedDate >= today) {
      this.dateBdHasError = true;
    } else {
      this.dateBdHasError = false;
    }
  }

  onSubmit(form: NgForm) {
    let id = this.employees.length;

    let employee: IEmployee = {
      id: id + 1,
      username: form.value.username,
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      email: form.value.email,
      // birthDate: this.dateBd,
      birthDate: form.value.bd,
      basicSalary: form.value.salary,
      status: form.value.status,
      group: form.value.group,
      // description: this.dateDesc
      description: form.value.desc
    }

    this._employeeService.addEmployee(employee)
      .subscribe(
        data => console.log('Success!'),
        err => console.log(err)
      );
  }

  cancel() {
    this.router.navigate(['/employee']);
  }

}
