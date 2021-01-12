import { element } from 'protractor';
import { ProducttypeService } from './../../services/producttype.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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

  p: number = 2;
  itemsTotal: number = 10;

  options = [
    { value: '1', label: '10' },
    { value: '2', label: '25' },
    { value: '3', label: '50' },
  ];
  default=1;


  pageForm = new FormGroup({
    itemsPerPage:  new FormControl(null),
    pageNumber:  new FormControl(null),
  })

  constructor(
    private productTypeService: ProducttypeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    // server side pagination
    /*
    this.productTypeService.getPage(this.itemsTotal, this.p ).subscribe(results => {
      this.productType=results.pageResults;
    },

    error => {
      this.gotoLogin();
    });
    */
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
