import { Component, OnInit } from '@angular/core';
/* import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  // products: IProduct[] = [];

  // private root: string;
  // private corsHeaders: HttpHeaders;

  constructor() {}

  /* constructor(private http: HttpClient) {
    this.root = 'https://localhost:4200';
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:4200'
    });
   } */

  ngOnInit(): void {
    /* this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe(
      // (response: IPagination) => {
      (response: any) => {
        this.products = response.data;
      }, error => {
        console.log(error);
      }); */
  }

}
