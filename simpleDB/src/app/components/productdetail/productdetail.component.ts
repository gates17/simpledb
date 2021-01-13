import { ProductmaterialService } from './../../services/productmaterial.service';
import { ProducttypeService } from './../../services/producttype.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  private request:any;

  product: any;
  productSub: Subscription;


  productForm = new FormGroup({
    type_id:  new FormControl(null),
    material_id:  new FormControl(null),
    reference:  new FormControl(null),
    description:  new FormControl(null),
    weight:  new FormControl(null),
    price:  new FormControl(null),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    private _productTypeService: ProducttypeService,
    private _materialService: ProductmaterialService,
    private location: Location,

    ) { }

    ngOnInit(): void {
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(this.route)

      if (id) {

        this.request = this._productService.get(id).subscribe((prod: any) => {
          if (prod) {
            this.product = prod[0];

            this._productTypeService.get(this.product.type_id).subscribe((pt: any) => {
              this.productForm.controls.type_id.setValue(pt[0].description);
            });

            this._materialService.get(this.product.material_id).subscribe((mat: any) => {
              console.log(mat[0].description)
              this.productForm.controls.material_id.setValue(mat[0].description);
            });

            this.productForm.controls.reference.setValue(this.product.reference);
            this.productForm.controls.description.setValue(this.product.description);
            this.productForm.controls.weight.setValue(this.product.weight);
            this.productForm.controls.price.setValue(this.product.price);
          }
          else {
            this.gotoList();
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

  update( ){
    this.router.navigate(['products/update/'+this.product.id])
  }
}
