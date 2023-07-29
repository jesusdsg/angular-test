import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/pages/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) {}

  setForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          ),
        ],
      ],
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.setForm();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Data is ', this.loginForm.value);
      const { email, password } = this.loginForm.value;
      email == 'admin@mail.com' && password == 'NicePassword123.'
        ? this.storage.saveData('currentUser', email)
        : alert('Invalid username or password');
    } else {
      //alert('Invalid credentials');
    }
  }
}
