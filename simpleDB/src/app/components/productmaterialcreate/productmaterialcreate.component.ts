import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-productmaterialcreate',
  templateUrl: './productmaterialcreate.component.html',
  styleUrls: ['./productmaterialcreate.component.scss']
})
export class ProductmaterialcreateComponent implements OnInit {
  private request:any;
  product: string;
  access_token:any;
  types:any;

  //productSub: Subscription;
  productForm = new FormGroup({
    description:  new FormControl(null),
     /*
    name: new FormControl('', [Validators.required,Validators.maxLength(255)]),
    tlf: new FormControl('', [ Validators.required, Validators.max(999999999), Validators.min(900000000)]),
   */
  })

  validation_messages = {
    'name': [
      { type: 'required', message: 'É necessário inserir o nome' },
      { type: 'size', message: 'Deve inserir no máximo ate 255 caracteres'}
    ],
    'tlf': [
      { type: 'size', message: 'Insira um contacto com 9 digitos'},
      { type: 'required', message: 'É necessário inserir um contacto'  }
    ],
    'address': [
      { type: 'size', message: 'Insira uma morada até 1024 caracteres'},
    ],
    'zip_code': [
      { type: 'size', message: 'Insira um código postal até 16 digitos'},
    ],
    'localidade': [
      { type: 'size', message: 'Insira uma localidade até 16 digitos'},
    ]

    }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productMaterialService: ProductmaterialService,
    private location: Location,
  ) { }

  ngOnInit() {

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
    console.log(this.productForm.value)
    this.productMaterialService.create(this.productForm.value).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}

