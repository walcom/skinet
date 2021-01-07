import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from './../shared/models/brand';
import { IType } from './../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  brandIdSelected!: number;
  typeIdSelected!: number;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }


  // tslint:disable-next-line: typedef
  getProducts(){
    this.shopService.getProducts().subscribe(response => {
      if(response != null){
        this.products = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = response;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }


  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number){
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }


}
