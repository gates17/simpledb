import { ProductService } from 'src/app/services/product.service';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[ProductExists]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ProductExistsDirective,
    multi: true
  }]
})
export class ProductExistsDirective implements Validator{
  match: any

  constructor(private _productService: ProductService) {}

  validate(control: AbstractControl) : {[key: string]: any} | null {

    if (control.value || control.value === 0) {
      this._productService.searchReference(control.value).subscribe(result => {
        this.match = result
        console.log(this.match)
        /* if(this.match) {
          console.log(this.match)
          return { 'productExists': 'A Referência já existe.' }; // return object if the validation is not passed.
        }
        else{
          console.log(this.match)
          return null; // return null if validation is passed.

        } */
      })

    }
    if(this.match && this.match.length >0) {
      console.log(this.match)
      return { 'productExists': 'A Referência já existe.' }; // return object if the validation is not passed.
    }
    else{
      console.log(this.match)
      return null; // return null if validation is passed.

    }
  }

}
