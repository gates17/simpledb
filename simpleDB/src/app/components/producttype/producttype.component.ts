import { element } from 'protractor';
import { ProducttypeService } from './../../services/producttype.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.scss']
})
export class ProducttypeComponent implements OnInit {
  access_token: any;
  productType: any;
  currentProduct = null;
  currentIndex = -1;
  name = '';

  p: number = 1;

  options = [
    { value: '1', label: '10' },
    { value: '2', label: '25' },
    { value: '3', label: '50' },
  ];
  default=1;

  itemsTotal = 10;
  constructor(
    private productTypeService: ProducttypeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    this.readProductproductType();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  pageItems(event: any){
    this.itemsTotal=event.target.value
  }

  readProductproductType(): void {
    this.productTypeService.getAll(this.access_token)
      .subscribe(
        productType => {
          this.productType = productType;
        },
        error => {
          this.gotoLogin();
        });
  }

}
