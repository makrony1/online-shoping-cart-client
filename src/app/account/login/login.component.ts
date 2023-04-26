import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { validationConfig } from './login.validation';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../../shared/service/logger.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  returnUrl: string;
  isLoading=false;
  currentUser$: Observable<CurrentUser>;


  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private router: Router,
    private logger: LoggerService,
    public toast: ToastComponent,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  buildForm(): void {
    this.form = this.fb.group(validationConfig);
  }

  onLogin(): void {
    this.submitted = true;
    this.isLoading=true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.isLoading=false;
      return;
    }

    this.service.login(this.form.value).subscribe(
      () => {
        this.isLoading=false;

        this.currentUser$ = this.service.currentUser$;
    this.currentUser$.subscribe(user=>{
      // if(user.roles!= null || user.roles!= undefined){
      //     let isadmin = user.roles.find(x=>x=='ROLE_ADMIN')!= null;
      //     let isvendor = user.roles.find(x=>x=='ROLE_VENDOR')!= null;

      //     if(isadmin!= null || isadmin != undefined){
      //       this.router.navigateByUrl("/admin");
      //     }

      //     if(isvendor!= null || isvendor != undefined){
      //       this.router.navigateByUrl("/vendor");
      //     }

      //   }

    })
        


        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        this.toast.setMessage(`${error.error}`, 'danger');
        this.isLoading=false;
        this.logger.logError('LoginComponent', error.error);
      }
    );
  }
}
