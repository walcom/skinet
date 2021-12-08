import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
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

  constructor(private basketService: BasketService, private accountService: AccountService ) {}

  /* constructor(private http: HttpClient) {
    this.root = 'https://localhost:4200';
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:4200'
    });
   } */

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }


  // tslint:disable-next-line: typedef
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    console.log(token);
    // tslint:disable-next-line: no-non-null-assertion
    /* this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('loaded user');
    }, error => {
      console.log(error);
    }); */
  }


  // tslint:disable-next-line: typedef
  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId){
      this.basketService.getBasket(basketId).subscribe( () => {
        console.log('Initializing Basket...');
      }, error => {
        console.log(error);
      });
    }
    /* this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe(
      // (response: IPagination) => {
      (response: any) => {
        this.products = response.data;
      }, error => {
        console.log(error);
      }); */
  }

}
