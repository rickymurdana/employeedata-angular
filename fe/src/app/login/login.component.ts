import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm) {
    // console.log(form.value)

    let user: Login = {
      email: form.value.email,
      password: form.value.password
    }

    if (form.value.email === 'admin@gmail.com' && form.value.password === 'admin') {
      this.router.navigate(['/employee']);
    } else {
      alert("Email and password wrong")
    }
  }
}

export class Login {
  email: string;
  password: string;
}
