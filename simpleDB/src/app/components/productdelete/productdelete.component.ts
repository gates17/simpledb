import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productdelete',
  templateUrl: './productdelete.component.html',
  styleUrls: ['./productdelete.component.scss']
})
export class ProductdeleteComponent implements OnInit {
  productSub: Subscription;
  private request: any ;
  product: any;

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
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.request = this.productService.get(id).subscribe((prod: any) => {
          this.product = prod[0];
          if(this.product.removed === false)
            this.productForm.controls.removed.setValue(true);
          else{
            this.productForm.controls.removed.setValue(false);
          }
        });
      }
      else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  softDelete(){
    this.productService.update(this.product.id, this.productForm.value).subscribe(result => {
      this.goBack();
    }, error => console.error(error));
  }
}
