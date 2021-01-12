import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from './../shared/models/brand';
import { IType } from './../shared/models/productType';
import { ShopParams } from './../shared/models/shopParams';
import { Event } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm!: ElementRef;

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  // brandIdSelected!: number;
  // typeIdSelected!: number;

  shopParams = new ShopParams();
  totalCount!: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }


  // tslint:disable-next-line: typedef
  getProducts(){
    // this.brandIdSelected, this.typeIdSelected, this.sortSelected
    this.shopService.getProducts(this.shopParams)
    .subscribe(response => {
      if (response != null){
        this.products = response.data;

        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count; 
      }
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      // this.brands = response;
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      // this.types = response;
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }


  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }


  // tslint:disable-next-line: typedef
  onSortSelected($event: any, sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  // $event.target.value


  // tslint:disable-next-line: typedef
  onPageChanged(event: any){
    // tslint:disable-next-line: deprecation
    if (this.shopParams.pageNumber !== event.page){
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }

  // tslint:disable-next-line: typedef
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
