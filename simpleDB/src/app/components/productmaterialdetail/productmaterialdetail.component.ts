import { Component, OnInit } from '@angular/core';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-productmaterialdetail',
  templateUrl: './productmaterialdetail.component.html',
  styleUrls: ['./productmaterialdetail.component.scss']
})
export class ProductmaterialdetailComponent implements OnInit {
  private request:any;

  typeReq:any;
  product: any;
  productSub: Subscription;


  productForm = new FormGroup({
    description:  new FormControl(null),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductmaterialService,
    private location: Location,


    ) { }

    ngOnInit(): void {
    this.productSub = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {

        this.request = this.productService.get(id).subscribe((prod: any) => {
          if (prod) {
            this.product = prod[0];

            this.productForm.controls.description.setValue(this.product.description);
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
    this.router.navigate(['productmaterial/update/'+this.product.id])
  }
}
