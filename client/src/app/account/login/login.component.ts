import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }


  // tslint:disable-next-line: typedef
  get email() {
    // loginForm.get('email')
    // email.errors['pattern']
    // email.errors['required']
    return this.loginForm.get('email') as FormControl;
  }

  // tslint:disable-next-line: typedef
  get password() {
    return this.loginForm.get('password') as FormControl;
  }


  // tslint:disable-next-line: typedef
  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]), // .email]),
      password: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    // Test Password Pa$$w0rd
    // console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe(() => {
      // console.log('user logged in');
      // this.router.navigateByUrl('/shop');
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log(error);
    });
  }

}
