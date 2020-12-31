import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';


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
    store_id:  new FormControl(null),
    type_id:  new FormControl(null),
    material_id:  new FormControl(null),
    reference:  new FormControl(null),
    description:  new FormControl(null),
    state:  new FormControl(null),
    entryDate:  new FormControl(null),
    lastUpdate:  new FormControl(null),
    soldDate:  new FormControl(null),
    seller:  new FormControl(null),
    insertedBy:  new FormControl(null),
    weight:  new FormControl(null),
    price:  new FormControl(null),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.request = this.productService.get(id).subscribe((prod: any) => {
          if (prod) {
            this.product = prod[0];

            let entrydate:any = null;
            let lastUpdate:any = null;
            let soldDate:any = null;
            if(this.product.entryDate !== null){
              entrydate = formatDate(this.product.entryDate, 'yyyy-MM-dd', 'en-US')
            }
            if(this.product.lastUpdate !== null){
              lastUpdate = formatDate(this.product.lastUpdate, 'yyyy-MM-dd', 'en-US')
            } if(this.product.soldDate !== null){
              soldDate = formatDate(this.product.soldDate, 'yyyy-MM-dd', 'en-US')
            }


            this.productForm.controls.store_id.setValue(this.product.store_id);
            this.productForm.controls.type_id.setValue(this.product.type_id);
            this.productForm.controls.material_id.setValue(this.product.material_id);
            this.productForm.controls.reference.setValue(this.product.reference);
            this.productForm.controls.description.setValue(this.product.description);
            this.productForm.controls.state.setValue(this.product.state);
            this.productForm.controls.entryDate.setValue(entrydate);
            this.productForm.controls.lastUpdate.setValue(lastUpdate);
            this.productForm.controls.soldDate.setValue(soldDate);
            this.productForm.controls.seller.setValue(this.product.seller);
            this.productForm.controls.insertedBy.setValue(this.product.insertedBy);
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

}
