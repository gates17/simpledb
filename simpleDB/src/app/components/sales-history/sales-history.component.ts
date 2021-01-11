import { SalesService } from './../../services/sales.service';
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
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  access_token: any;
  product: any;
  pDel: any;
  currentProduct = null;
  currentIndex = -1;
  searchquery;
  searchresults: any = [];


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
    private salesService: SalesService,
    private typeService: ProducttypeService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
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

    this.salesService.getAll(this.access_token)
      .subscribe(
        product =>
        {
          for(let p of product){
            this.typeService.get(p.type_id).subscribe(result => { p.type_id=result[0].description})
          }
          this.product = product
        },
        error => {

          this.gotoLogin();
        });
/*
    this.salesService.getAll(this.access_token).pipe(map(r=> {
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
