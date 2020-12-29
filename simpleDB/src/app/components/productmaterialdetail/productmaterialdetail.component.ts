import { Component, OnInit } from '@angular/core';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productmaterialdetail',
  templateUrl: './productmaterialdetail.component.html',
  styleUrls: ['./productmaterialdetail.component.scss']
})
export class ProductmaterialdetailComponent implements OnInit {
currentProduct = null;
  message = '';

  constructor(
    private productService: ProductmaterialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }

  getProduct(id): void {
    this.productService.get(id)
      .subscribe(
        product => {
          this.currentProduct = product;
          console.log(product);
        },
        error => {
          console.log(error);
        });
  }

  setAvailableStatus(status): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      available: status
    };

    this.productService.update(this.currentProduct.id, data)
      .subscribe(
        response => {
          this.currentProduct.available = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }
}
