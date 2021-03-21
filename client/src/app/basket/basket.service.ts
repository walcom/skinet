import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Basket, IBasket, IBasketItem } from './../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from './../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  // private basketSource = new BehaviorSubject<IBasket | null>(null);
  private basketSource = new BehaviorSubject<IBasket>(null);
  // private basketSource = new BehaviorSubject(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
        })
      );
  }

  // tslint:disable-next-line: typedef
  setbasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
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
    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    // basket.items.push(itemToAdd);
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  }


  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    throw new Error('Method not implemented.');
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
