import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../employee';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  public employeeId;
  employeeDetail: IEmployee | undefined;
  errMsg = '';
  constructor(private route: ActivatedRoute, private router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    const param = parseInt(this.route.snapshot.paramMap.get('id'));
    if (param) {
      const id = +param;
      this.getEmployee(id);
    }
  }

  getEmployee(id: number) {
    this._employeeService.getEmployeeById(id).subscribe(
      employee => this.employeeDetail = employee,
      err => this.errMsg = err
    );
  }

  back() {
    this.router.navigate(['/employee']);
  }

}
