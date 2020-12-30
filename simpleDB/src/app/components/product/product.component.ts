import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  access_token: any;
  product: any;
  currentProduct = null;
  currentIndex = -1;
  name = '';

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    console.log('nginit')
    this.readProduct();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  readProduct(): void {
    this.productService.getAll(this.access_token)
      .subscribe(
        product => {
          this.product = product;
        },
        error => {

          this.gotoLogin();
        });
  }

}
