import { Observable } from 'rxjs';
import { ProducttypeService } from './../../services/producttype.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';
import { existingReferenceValidator } from 'src/app/directives/product-exists.directive';


@Component({
  selector: 'app-productcreate',
  templateUrl: './productcreate.component.html',
  styleUrls: ['./productcreate.component.scss']
})
export class ProductcreateComponent implements OnInit {
  private request: any;
  product: string;
  access_token: any;
  types: any;
  materials :any;

  //productSub: Subscription;
  productForm = new FormGroup({
    type_id:  new FormControl('', [Validators.required]),
    material_id:  new FormControl('', [Validators.required]),
    reference:  new FormControl('', [Validators.required, Validators.maxLength(45)],[existingReferenceValidator(this._productService)]),//, ValidateReference]),
    description:  new FormControl('' , [Validators.required, Validators.maxLength(45)]),
    entryDate:  new FormControl(null),
    weight:  new FormControl(null),
    price:  new FormControl('', [Validators.required]),
    /*
    store_id:  new FormControl(null),
    state:  new FormControl(null),
    lastUpdate:  new FormControl(null),
    soldDate:  new FormControl(null),
    seller:  new FormControl(null),
    insertedBy:  new FormControl(null),
    */
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
    private _productService: ProductService,
    private _productTypeService: ProducttypeService,
    private _materialService: ProductmaterialService,
    private location: Location,

  ) { }

  ngOnInit() {

    this.access_token= sessionStorage.getItem('access_token')
    this._productTypeService.getAll(this.access_token).subscribe(
      result => {
      this.types = result;
    });
    this._materialService.getAll(this.access_token).subscribe((mat: any) => {
      this.materials = mat;
    });
  }

  ngOnDestroy() {
    //this.request.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/products']);
  }

  createProduct() {
    const currentDate = new Date().toISOString().slice(0,10)
    this.productForm.controls.entryDate.setValue(currentDate);
    this._productService.create(this.productForm.value).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  goBack() {
    this.location.back();
  }

}
