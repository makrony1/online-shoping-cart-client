import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { mustMatch, validationConfig } from './register.validation';
import { LoggerService } from '../../shared/service/logger.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  returnUrl='';
  isLoading=false;
  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    public toast: ToastComponent,
    private loggerService: LoggerService,
    private router: Router
  ) {
    this.buildForm();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.returnUrl =  '/';
  }

  buildForm(): void {
    this.form = this.fb.group(validationConfig, {
      validators: mustMatch('password', 'confirmation'),
    });
  }

  onRegister(): void {
    this.submitted = true;
    this.isLoading=true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.service.register(this.form.value).subscribe(
      (response) => {
        this.isLoading=false;

        var values = this.form.value;
        let loging= {
          username:values.username,
          password:values.password
        };
        this.service.login(loging).subscribe((res)=>{
          this.router.navigateByUrl('/');
        })
      },
      (error) => {
        this.isLoading=false;

        this.toast.setMessage(error.error, 'danger');
        this.loggerService.logError('RegisterComponent', error.error);
      }
    );
  }
}
