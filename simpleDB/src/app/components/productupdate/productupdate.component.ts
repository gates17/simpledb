import { ProducttypeService } from './../../services/producttype.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate, Location } from '@angular/common';


@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.scss']
})
export class ProductupdateComponent implements OnInit {
  private request:any;
  product: any;
  productSub: Subscription;
  access_token:any;
  types:any;

  productForm = new FormGroup({
    type_id:  new FormControl(null),
    material_id:  new FormControl(null),
    reference:  new FormControl(null),
    description:  new FormControl(null),
    lastUpdate:  new FormControl(null),
   /*  store_id:  new FormControl(null),
    state:  new FormControl(null),
    entryDate:  new FormControl(null),
    soldDate:  new FormControl(null),
    seller:  new FormControl(null),
    insertedBy:  new FormControl(null), */
    weight:  new FormControl(null),
    price:  new FormControl(null),
 //   removed:  new FormControl(null),
  })

  constructor(
    //private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private productTypeService: ProducttypeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];

      this.productTypeService.getAll(this.access_token).subscribe(
        result => {
        this.types = result;
        console.log(result)
      });

      if (id) {
        this.request = this.productService.get(id).subscribe((prod: any) => {
          if (prod) {
            this.product = prod[0];

            this.productForm.controls.type_id.setValue(this.product.type_id);
            this.productForm.controls.material_id.setValue(this.product.material_id);
            this.productForm.controls.reference.setValue(this.product.reference);
            this.productForm.controls.description.setValue(this.product.description);
            this.productForm.controls.weight.setValue(this.product.weight);
            this.productForm.controls.price.setValue(this.product.price);
//            this.productForm.controls.removed.setValue(this.product.removed);
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

    this.productService.update(this.product.id, this.productForm.value).subscribe(result => {
      console.log('teste')
      this.gotoList();
    }, error => console.error(error));
  }

}
