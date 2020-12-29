import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { ProductComponent } from './components/product/product.component';

import { ProductmaterialComponent } from './components/productmaterial/productmaterial.component';
import { ProductmaterialdetailComponent } from './components/productmaterialdetail/productmaterialdetail.component';
import { ProductmaterialcreateComponent } from './components/productmaterialcreate/productmaterialcreate.component';
import { ProductmaterialupdateComponent } from './components/productmaterialupdate/productmaterialupdate.component';

import { ProducttypeComponent } from './components/producttype/producttype.component';
// import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path:  '', redirectTo:  'contacts', pathMatch:  'full' },
  /* {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'brands',
    component: BrandsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  */
  { path: 'products', component: ProductComponent },

  { path: 'productmaterial', component: ProductmaterialComponent },
  { path: 'productmaterial/:id', component: ProductmaterialdetailComponent },
  { path: 'productmaterial/create', component: ProductmaterialcreateComponent },
  { path: 'productmaterial/update/:id', component: ProductmaterialupdateComponent },

  { path: 'producttype/', component: ProducttypeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
