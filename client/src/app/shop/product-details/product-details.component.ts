import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct } from './../../shared/models/product';
import { ShopService } from './../shop.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService,
              private activateRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }


  // tslint:disable-next-line: typedef
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  // tslint:disable-next-line: typedef
  incrementQuantity(){
    this.quantity++;
  }

  // tslint:disable-next-line: typedef
  decrementQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  // tslint:disable-next-line: typedef
  loadProduct(){
    // tslint:disable-next-line: no-non-null-assertion
    const id = +this.activateRoute.snapshot.paramMap.get('id')!;
    this.shopService.getProduct(id).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

}
