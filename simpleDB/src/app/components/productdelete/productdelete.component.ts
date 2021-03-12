import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-productdelete',
  templateUrl: './productdelete.component.html',
  styleUrls: ['./productdelete.component.scss']
})
export class ProductdeleteComponent implements OnInit {
  access_token: any;
  product: any;
  productB: any;

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
    private route: ActivatedRoute,
    private router: Router,
    private location: Location


  ) { }

  ngOnInit(): void {
    this.getPage()

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
    this.productService.getRemovedPage(this.itemsTotal, this.p ).subscribe(results => {
      this.product = results.pageResults;
      this.productB = results.products;
      this.totalPrice = results.price[0].totalprice;
      this.totalWeight = results.weight[0].totalweight;
      this.pagesTotal = results.totalPages[0].total;
      console.log(this.pagesTotal)
      console.log(this.product)
      /*  this.product=results.pageResults;
       this.pagesTotal=results.totalPages[0].total;*/
    },

    error => {
      this.goBack();
    });
  }

  pageChange($event) {
    this.p=$event;
    if (this.pagesTotal > this.itemsTotal && this.product.length <= this.itemsTotal)
    {
      this.getPage();
    }
  }
  
  softDelete(pid){
    this.productForm.controls.removed.setValue(0)
    this.productService.softDelete(pid, this.productForm.value).subscribe(result => {
      this.getPage()
      this.router.navigate(['/products/delete']);
    }, error => console.error(error));
  }

  remove(pid){
    this.productService.delete(pid).subscribe()
    this.getPage();
    //this.productService.deleteAll(toRemove).subscribe(result => {})
  }

  removeAll(){
    for(let p of this.product){
      this.productService.delete(p.id).subscribe()
    }
    this.getPage();
    //this.productService.deleteAll(toRemove).subscribe(result => {})
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
