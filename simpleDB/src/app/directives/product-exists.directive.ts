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

  constructor(private _productService: ProductService) {}

  validate(control: AbstractControl) : {[key: string]: any} | null {
    let match: any
    if (control.value) {
      console.log("INVALIDO")
      this._productService.searchReference(control.value).subscribe(result => {
        console.log(result)
        match = result
      })
      console.log(match)
      return { 'phoneNumberInvalid': true }; // return object if the validation is not passed.
    }
    console.log("VALIDO")
    return null; // return null if validation is passed.
  }

}
