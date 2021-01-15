import { SearchService } from './../../services/search.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  @ViewChild('filterInput') public userInput: ElementRef;
  @ViewChild('filterTypeInput') public typeInput: ElementRef;
  @ViewChild('filterMatInput') public matInput: ElementRef;


  access_token: any;
  product: any;
  //pDel: any;
  productSub: Subscription;

  searchquery;
  searchresults: any = [];
  typeRes: any = [];
  materialRes: any = [];
  typequery;
  materialquery;

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
    private _searchService: SearchService,
    //private typeService: ProducttypeService,
    private router: Router,
    private route:ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
  /*   console.log('teste')
    this.access_token= sessionStorage.getItem('access_token')
    //this.readProduct();

    this.productSub = this.route.params.subscribe(params => {
      console.log(params)
      const results = params['sp'];
      console.log(results)
      if (results) {

        this.productService.search(results).subscribe((prod: any) => {
          console.log(prod)
          if (prod) {
            this.product = prod;
          }
        });
      }

    }); */
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  search(event: any){
    let searchParam = event.target.value;
    if(searchParam === "") { this.searchresults = []}
    if(searchParam !== "" && searchParam !==null && searchParam !== undefined)
    {
      this.searchquery = searchParam
      this._searchService.getProduct(searchParam).subscribe(
        results => {
          this.searchresults = results
        }
      )
    }
  }

  fullMatchSearch(){
    this._searchService.getProduct(this.searchquery).subscribe(
      results => {
        this.searchresults = results
      }
    )
    this.messageEvent.emit(this.searchresults)
  }

  searchType(event: any){
    let searchParam = event.target.value;
    if(searchParam === "") { this.typeRes = [], this.typequery=null}
    if(searchParam !== "" && searchParam !==null && searchParam !== undefined)
    {
      this.typequery = searchParam
      this._searchService.getType(searchParam).subscribe(
        results => {
          this.typeRes = results
        }
      )
    }
  }

  searchMaterial(event: any){
    let searchParam = event.target.value;
    // console.log("Param "+searchParam, "query "+this.materialquery, "res "+this.materialRes)
    if(searchParam === "") { this.materialRes = [], this.materialquery=null}
    if(searchParam !== "" && searchParam !==null && searchParam !== undefined)
    {
      this.materialquery = searchParam
      this._searchService.getMaterial(searchParam).subscribe(
        results => {
          this.materialRes = results
        }
      )
    }
  }

  catSearch(){

    this._searchService.getCat(this.typequery, this.materialquery).subscribe(
      results => {
        this.searchresults = results
      }
    )
    this.messageEvent.emit(this.searchresults)
    //this.messageEvent.emit(this.searchresults)
  }

  selectedResult(result: any): void {
    this.userInput.nativeElement.value = result;
  }
  selectedType(result: any): void {
    this.typeInput.nativeElement.value = result;
  }
  selectedMaterial(result: any): void {
    this.matInput.nativeElement.value = result;
  }
}
