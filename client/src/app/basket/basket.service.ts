import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Basket, IBasket, IBasketItem, IBasketTotals } from './../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from './../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
   private basketSource = new BehaviorSubject<IBasket | null>(null);
  //private basketSource = new BehaviorSubject<IBasket>(null);
   // private basketSource = new BehaviorSubject(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$  = this.basketTotalSource.asObservable();


  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map( (basket: any) => {
          this.basketSource.next(basket);
          // console.log(this.getCurrentBasketValue());
          this.calculateTotals();
        })
      );
  }

  // tslint:disable-next-line: typedef
  setbasket(basket: IBasket){
    // tslint:disable-next-line: deprecation
    return this.http.post(this.baseUrl + 'basket', basket).subscribe( (response: any) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  // tslint:disable-next-line: typedef
  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();
    if(basket === null){
      basket = this.createBasket();
    }

    // console.log(basket);
    // basket.items.push(itemToAdd);
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setbasket(basket);
  }


  // tslint:disable-next-line: typedef
  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping  = 0;
    // tslint:disable-next-line: no-non-null-assertion
    const subtotal = basket!.items.reduce((a, b) => (b.price * b.quantity) +a , 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }


  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    console.log(items);

    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else{
      items[index].quantity += quantity;
    }

    return items;
  }


  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }


}
