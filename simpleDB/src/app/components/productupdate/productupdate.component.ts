import { ProducttypeService } from './../../services/producttype.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate, Location } from '@angular/common';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';


@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.scss']
})
export class ProductupdateComponent implements OnInit {
  private request:any;
  product: any;
  productSub: Subscription;
  access_token: any;
  types: any;
  materials: any;

  productForm = new FormGroup({
    lastUpdate:  new FormControl(null),
    type_id:  new FormControl('', [Validators.required]),
    material_id:  new FormControl('', [Validators.required]),
    reference:  new FormControl('', [Validators.required, Validators.maxLength(45)]),
    description:  new FormControl('' , [Validators.required, Validators.maxLength(45)]),
    weight:  new FormControl(null),
    price:  new FormControl('', [Validators.required]),
  })

  constructor(
    //private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    private _productTypeService: ProducttypeService,
    private _materialService: ProductmaterialService,
    private location: Location
  ) { }

  ngOnInit() {
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];

      this._productTypeService.getAll(this.access_token).subscribe(
        result => {
        this.types = result;
      });

      this._materialService.getAll(this.access_token).subscribe((mat: any) => {
        this.materials = mat;
      });


      if (id) {
        this.request = this._productService.get(id).subscribe((prod: any) => {
          if (prod) {
            this.product = prod[0];

            this.productForm.controls.type_id.setValue(this.product.type_id);
            this.productForm.controls.material_id.setValue(this.product.material_id);
            this.productForm.controls.reference.setValue(this.product.reference);
            this.productForm.controls.description.setValue(this.product.description);
            this.productForm.controls.weight.setValue(this.product.weight);
            this.productForm.controls.price.setValue(this.product.price);
            console.log(this.product, this.productForm.value)
          } else {
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

  createProduct() {
    //this.request =
    const currentDate = new Date().toISOString().slice(0,10)

    this.productForm.controls.lastUpdate.setValue(currentDate);
    if (!this.productForm.controls.weight.value) {
      this.productForm.controls.weight.setValue(0.0)
      console.log("o peso é "+this.productForm.controls.weight.value+" gramas")
    }
    this._productService.update(this.product.id, this.productForm.value).subscribe(result => {
      console.log('teste')
      this.gotoList();
    }, error => console.error(error));
  }

}
