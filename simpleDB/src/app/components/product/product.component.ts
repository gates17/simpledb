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
  pDel: any;
  currentProduct = null;
  currentIndex = -1;
  searchquery;
  searchresults: any = [];
  totalPrice: any;
  totalWeight: any;

  p: number = 1;

  options = [
    { value: '1', label: '10' },
    { value: '2', label: '25' },
    { value: '3', label: '50' },
  ];
  default=1;
  itemsTotal = 10;

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
    this.readProduct();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  pageItems(event: any){
    this.itemsTotal=event.target.value
  }

  readProduct(): void {

    this.productService.getAll(this.access_token)
      .subscribe(
        results =>
        {
          this.product = results.products;
          this.totalPrice = results.price[0].totalprice;
          this.totalWeight = results.weight[0].totalweight;
          console.log(results.weight[0].totalweight)
          console.log(results.price[0].totalprice)
        },
        error => {

          this.gotoLogin();
        });
/*
    this.productService.getAll(this.access_token).pipe(map(r=> {
      for(let p of r){
        p.type_id = this.typeService.get(p.type_id).subscribe(result => {})
      }
      console.log(r)
      this.product = r
    }))
    .subscribe(
      product =>
      {
        this.product = product
        console.log(this.product)
      },
      error => {

        this.gotoLogin();
      });
*/
  }


  softDelete(id){
    this.productService.get(id).subscribe(result => {
      this.pDel = result[0]
      if(this.pDel.removed === 0)
            this.productForm.controls.removed.setValue(1);
          else{
            this.productForm.controls.removed.setValue(0);
          }

    })
    this.productService.softDelete(id, this.productForm.value).subscribe(result => {
      this.router.navigate(['/dashboard']);
    }, error => console.error(error));
  }

  search(event: any){
    let prod: any;
    let searchresults: any = [];
    let searchParam = event.target.value;
    this.searchquery = searchParam
    if(searchParam === "") { this.searchresults = []}
    if(searchParam !== "" && searchParam !==null && searchParam !== undefined)
    {
      for(prod of this.product){
        let match = false
        for(let key in prod) {
          let value = prod[key]
            if (value && value.toString() && value.toString().toLowerCase().includes(searchParam.toString().toLowerCase())) {
              match=true
            }
        }
        if(match===true) {
          searchresults.push(prod)
        }
      }
      this.searchresults=searchresults
    }
  }
  fullMatchSearch(){

    console.log('SEARCH')
    console.log(this.searchresults)
    this.router.navigate(['/search/'+ this.searchquery])
  }

  convertPdf() {


    var doc = new jspdf('l','mm','A4');
    var col = [["Id", "loja","tipo de material","material","referencia","descrição","data de registo"," data de atualização ","data de venda", "vendedor", "criado por", "peso", "preço", "disponibilidade"]];
    var rows = [];

    this.product.forEach(element => {
      let values = [];
      for (let key in element ){
        let value=element[key]
        values.push(value)
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
