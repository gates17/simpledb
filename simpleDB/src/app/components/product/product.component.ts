import { element } from 'protractor';
import { SearchComponent } from './../search/search.component';
import { ProducttypeService } from './../../services/producttype.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  access_token: any;
  product: any;
  productB: any;
  toPrint: any;

  pDel: any; //soft delete

  searchquery;
  searchresults: any = [];

  totalPrice: any;
  totalWeight: any;

/*
  currentProduct = null;
  currentIndex = -1;
 */

  //pagination options
  p: number = 1;
  options = [
    { value: '1', label: '10' },
    { value: '2', label: '25' },
    { value: '3', label: '50' },
  ];
  default=1;
  itemsTotal = 10;
  pagesTotal: number = 1;

  productForm = new FormGroup({
    removed:  new FormControl(null),
  })
  constructor(
    private productService: ProductService,
    private typeService: ProducttypeService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    //console.log(this.productService.getTotal().subscribe(r => console.log(r)));
    //this.readProduct();
    this.getPage();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  receiveProducts($event) {
    if($event.length >0){
      this.product = $event
    }
    else{
      this.product = this.productB
      console.log('crl')
    }
  }


  pageItems(event: any){
    this.itemsTotal=event.target.value
  }

  getPage() {
    this.productService.getPage(this.itemsTotal, this.p ).subscribe(results => {
      this.product = results.pageResults;
      this.productB = results.products;
      this.totalPrice = results.price[0].totalprice;
      this.totalWeight = results.weight[0].totalweight;
      this.pagesTotal = results.totalPages[0].total;
      console.log(this.pagesTotal)
      /*  this.product=results.pageResults;
       this.pagesTotal=results.totalPages[0].total;*/
    },

    error => {
      this.gotoLogin();
    });
  }

  readProduct(): void {
    this.productService.getAll(this.access_token)
      .subscribe(
        results =>
        {
          this.product = results.products;
          this.productB = results.products;
          this.totalPrice = results.price[0].totalprice;
          this.totalWeight = results.weight[0].totalweight;
        },
        error => {

          this.gotoLogin();
        });
  }

  softDelete(pid){
    this.productForm.controls.removed.setValue(1)
    this.productService.softDelete(pid, this.productForm.value).subscribe(result => {
      this.getPage()
      this.router.navigate(['/products']);
    }, error => console.error(error));
  }

  convertPdf() {

    var doc = new jspdf('l','mm','A4');
    var col = [["tipo de material","material","referencia","descrição", "peso", "preço"]];
    var rows = [];

    this.product.forEach(element => {
      console.log(element)
      let values = [];
      for (let key in element ){
        if(key !== 'id') {
          let value=element[key]
          values.push(value)
        }
      }
      rows.push(values);

    });
    //doc.autotable(col, rows);

    (doc as any).autoTable({
      head: col,
      body: rows,
    })

    doc.save('Test.pdf');
  }
}
