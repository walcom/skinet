import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './../../shared/models/product';
import { ShopService } from './../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  // tslint:disable-next-line: typedef
  loadProduct(){
    // tslint:disable-next-line: no-non-null-assertion
    const id = +this.activateRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe(product => {
      this.product = product;
    }, error => {
      console.log(error);
    });
  }

}
