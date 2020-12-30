import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';

import { ProductmaterialComponent } from './components/productmaterial/productmaterial.component';
import { ProductmaterialdetailComponent } from './components/productmaterialdetail/productmaterialdetail.component';
import { ProductmaterialcreateComponent } from './components/productmaterialcreate/productmaterialcreate.component';
import { ProductmaterialupdateComponent } from './components/productmaterialupdate/productmaterialupdate.component';

import { ProducttypeComponent } from './components/producttype/producttype.component';
// import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path:  '', redirectTo:  'contacts', pathMatch:  'full' },

  { path: 'products/', component: ProductComponent },

  { path: 'productmaterial/', component: ProductmaterialComponent },
  { path: 'productmaterial/:id', component: ProductmaterialdetailComponent },
  { path: 'productmaterial/create', component: ProductmaterialcreateComponent },
  { path: 'productmaterial/update/:id', component: ProductmaterialupdateComponent },

  { path: 'producttype/', component: ProducttypeComponent },
  { path: 'login/', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
