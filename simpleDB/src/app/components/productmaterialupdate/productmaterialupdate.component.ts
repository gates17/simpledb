import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';

@Component({
  selector: 'app-productmaterialupdate',
  templateUrl: './productmaterialupdate.component.html',
  styleUrls: ['./productmaterialupdate.component.scss']
})
export class ProductmaterialupdateComponent implements OnInit {
  private request:any;
  product: any;
  productSub: Subscription;
  access_token:any;
  types:any;

  productForm = new FormGroup({

    description:  new FormControl(null),

  })

  constructor(
    //private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductmaterialService,
    private location: Location
  ) { }

  ngOnInit() {
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.request = this.productService.get(id).subscribe((prod: any) => {
          if (prod) {
            this.product = prod[0];


            this.productForm.controls.description.setValue(this.product.description);
          } else {
            this.goBack();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    //this.request.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/products']);
  }

  goBack() {
    this.location.back();
  }

  createProduct() {
    //this.request =
    this.productService.update(this.product.id, this.productForm.value).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
