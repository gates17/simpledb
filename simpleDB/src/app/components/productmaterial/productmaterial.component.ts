import { Component, OnInit } from '@angular/core';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';

@Component({
  selector: 'app-productmaterial',
  templateUrl: './productmaterial.component.html',
  styleUrls: ['./productmaterial.component.scss']
})
export class ProductmaterialComponent implements OnInit {

  products: any;
  currentProduct = null;
  currentIndex = -1;
  name = '';

  constructor(private productmaterialService: ProductmaterialService) { }

  ngOnInit(): void {
    this.readProducts();
  }

  readProducts(): void {
    this.productmaterialService.getAll()
      .subscribe(
        products => {
          this.products = products;
          console.log(products);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readProducts();
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
          this.readProducts();
        },
        error => {
          console.log(error);
        });
  }

  searchByName(): void {
    this.productmaterialService.searchByName(this.name)
      .subscribe(
        products => {
          this.products = products;
          console.log(products);
        },
        error => {
          console.log(error);
        });
  }
}
