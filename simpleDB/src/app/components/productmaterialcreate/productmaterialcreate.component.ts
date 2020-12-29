import { Component, OnInit } from '@angular/core';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';

@Component({
  selector: 'app-productmaterialcreate',
  templateUrl: './productmaterialcreate.component.html',
  styleUrls: ['./productmaterialcreate.component.scss']
})
export class ProductmaterialcreateComponent implements OnInit {

  product = {
    name: '',
    description: '',
    available: false
  };
  submitted = false;

  constructor(private productmaterialService: ProductmaterialService) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    const data = {
      name: this.product.name,
      description: this.product.description
    };

    this.productmaterialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      description: '',
      available: false
    };
  }

}

