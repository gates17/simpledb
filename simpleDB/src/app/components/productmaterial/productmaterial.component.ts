import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';

@Component({
  selector: 'app-productmaterial',
  templateUrl: './productmaterial.component.html',
  styleUrls: ['./productmaterial.component.scss']
})
export class ProductmaterialComponent implements OnInit {
  access_token: any;
  materials: any;
  currentProduct = null;
  currentIndex = -1;
  name = '';

  p: number = 1;

  constructor(
    private productmaterialService: ProductmaterialService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    console.log('nginit')
    this.readProductMaterials();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  readProductMaterials(): void {
    console.log('getall')
    console.log(this.access_token)
    this.productmaterialService.getAll(this.access_token)
      .subscribe(
        materials => {
          this.materials = materials;
        },
        error => {
          console.log('error')
          console.log(error);
          this.gotoLogin();
        });
  }
  /*
  refresh(): void {
    this.readProductMaterials();
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  setCurrentProduct(product, index): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  deleteAllProducts(): void {
    this.productmaterialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.readProductMaterials();
        },
        error => {
          console.log(error);
        });
  }

  searchByName(): void {
    this.productmaterialService.searchByName(this.name)
      .subscribe(
        products => {
          this.materials = products;
          console.log(products);
        },
        error => {
          console.log(error);
        });
  }
  */
}
