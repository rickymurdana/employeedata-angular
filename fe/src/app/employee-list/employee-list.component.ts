import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { faSearch, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees = [];
  searchText: string;
  errorMsg = '';
  selectPage: number = 10;
  curPage: number;
  pageSize: number;
  faSearch = faSearch;
  faSort = faSort;

  constructor(private _employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this._employeeService.getEmployee()
      .subscribe(data => this.employees = data, err => this.errorMsg = err);


    this.curPage = 1;
    this.pageSize = 10;
  }

  onSelect(value) {
    this.pageSize = value;
  }

  gotoAdd() {
    this.router.navigate(['add-employee']);
  }

  numberOfPages() {
    return Math.ceil(this.employees.length / this.pageSize);
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
