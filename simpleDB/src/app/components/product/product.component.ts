import { ProducttypeService } from './../../services/producttype.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

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
  totalPriceB: any;
  totalWeightB: any;
  pagesTotalB: any
  toPrint = [];
  toPrintB = [];

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
    this.getPage();
    this.productsToPrint()


  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  productsToPrint() {
    this.productService.getAll(this.access_token).subscribe(results => {
      this.toPrint = results.products
      this.toPrintB = results.products
      console.log(this.toPrint)
    })
  }

  receiveProducts($event) {
    if($event.results.length >0){
      this.product = $event.results
      this.totalPrice = $event.price[0].totalprice
      this.totalWeight = $event.weight[0].totalweight
      this.pagesTotal = $event.totalPages[0].total
      this.toPrint = $event.results
    }
    else{
      this.product = this.productB
      this.totalPrice = this.totalPriceB
      this.totalWeight = this.totalWeightB
      this.pagesTotal = this.pagesTotalB
      this.toPrint = this.toPrintB
    }
  }


  pageItems(event: any){
    this.itemsTotal=event.target.value
    this.getPage();
  }

  getPage() {
    this.productService.getPage(this.itemsTotal, this.p ).subscribe(results => {
      this.product = results.pageResults;
      this.productB = this.product;
      this.totalPrice = results.price[0].totalprice;
      this.totalWeight = results.weight[0].totalweight;
      this.pagesTotal = results.totalPages[0].total;
      this.totalPriceB = results.price[0].totalprice;
      this.totalWeightB = results.weight[0].totalweight;
      this.pagesTotalB = results.totalPages[0].total;
    },

    error => {
      this.gotoLogin();
    });
  }

  pageChange($event) {
    this.p=$event;
    if (this.pagesTotal > this.itemsTotal && this.product.length <= this.itemsTotal)
    {
      this.getPage();
    }
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
    var doc = new jspdf('p','mm','A4');
    var col = [["Referencia", "Descrição", "Tipo de Produto", "Material", "Peso", "Preço"]];
    var rows = [];

    this.toPrint.forEach(element => {
      let values = [];
      values.push(element['reference'])
      values.push(element['description'])
      values.push(element['type_id'])
      values.push(element['material_id'])
      values.push(element['weight'])
      values.push(element['price'])
      /* if no need to map element keys use this instead
      for (let key in element ){
        if(key !== 'id') {
          let value=element[key]
          values.push(value)
        }
      }
       */
      rows.push(values);
    });

    (doc as any).autoTable({
      head: col,
      body: rows,
    })

    doc.save('Test.pdf');
  }
}
