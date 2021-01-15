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

  p: number = 1;
  itemsTotal: number = 10;

  options = [
    { value: '1', label: '10' },
    { value: '2', label: '25' },
    { value: '3', label: '50' },
  ];
  default=1;
  pagesTotal: number = 1;

  constructor(
    private productTypeService: ProducttypeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    // server side pagination
    this.getPage();
    //this.readProductproductType();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  pageItemsChange($event){
    this.itemsTotal=$event.target.value;
    this.getPage();
  }

  pageChange($event) {
    this.p=$event;
    this.getPage();
  }

  getPage() {
    this.productTypeService.getPage(this.itemsTotal, this.p ).subscribe(results => {
      this.productType=results.pageResults;
      this.pagesTotal=results.totalPages[0].total;
    },

    error => {
      this.gotoLogin();
    });
  }

  remove(id:number) {
    this.productTypeService.delete(id).subscribe(results => {
      console.log(results)
      if(!results) {
        alert("O material está associado a um produto")
      }
      else{
        this.getPage()
      }
    });
  }

}
