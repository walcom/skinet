import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }


  // tslint:disable-next-line: typedef
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

    // tslint:disable-next-line: typedef
    get400ValidationError() {
      this.http.get(this.baseUrl + 'products/fourty').subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.validationErrors = error.errors;
      });
    }

    // tslint:disable-next-line: typedef
    testToast() {
      this.toast.success('I am toast', 'success');
    }

}
