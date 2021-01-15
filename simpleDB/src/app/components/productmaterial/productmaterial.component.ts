import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductmaterialService } from 'src/app/services/productmaterial.service';

@Component({
  selector: 'app-productmaterial',
  templateUrl: './productmaterial.component.html',
  styleUrls: ['./productmaterial.component.scss']
})
export class ProductmaterialComponent implements OnInit {
  access_token: any;
  materials: any;
  name = '';

  p: number = 1;

  options = [
    { value: '1', label: '10' },
    { value: '2', label: '25' },
    { value: '3', label: '50' },
  ];
  default=1;
  itemsTotal = 10;

  constructor(
    private productmaterialService: ProductmaterialService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.access_token= sessionStorage.getItem('access_token')
    this.readProductMaterials();
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  pageItems(event: any){
    this.itemsTotal=event.target.value
  }

  readProductMaterials(): void {
    this.productmaterialService.getAll(this.access_token)
      .subscribe(
        materials => {
          this.materials = materials;
        },
        error => {
          console.log('error')
          console.log(error);
          this.gotoLogin();
        });
  }

  remove(id:number) {
    this.productmaterialService.delete(id).subscribe(results => {
      if(!results) {
        alert("O material está associado a um produto")
      }
      else{
        this.readProductMaterials()
      }
    });
  }
}
