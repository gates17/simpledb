import { ProductService } from 'src/app/services/product.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export function existingReferenceValidator(_productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return _productService.searchReference(control.value).pipe(map(
      users => {
        return (users && users.length > 0) ? {productExists: 'A Referência já existe.'} : null;
      }
    ));
  };
}

@Directive({
  selector: '[ProductExists]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ProductExistsDirective,
    multi: true
  }]
})
export class ProductExistsDirective implements AsyncValidator{

  constructor(private _productService: ProductService) {}

  validate(control: AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null>  {
    return existingReferenceValidator(this._productService)(control);
  }



}
