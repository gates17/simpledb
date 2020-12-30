


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductupdateComponent } from './components/productupdate/productupdate.component';
import { ProductcreateComponent } from './components/productcreate/productcreate.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';

import { ProductmaterialComponent } from './components/productmaterial/productmaterial.component';
import { ProductmaterialdetailComponent } from './components/productmaterialdetail/productmaterialdetail.component';
import { ProductmaterialcreateComponent } from './components/productmaterialcreate/productmaterialcreate.component';
import { ProductmaterialupdateComponent } from './components/productmaterialupdate/productmaterialupdate.component';

import { ProducttypeComponent } from './components/producttype/producttype.component';
import { ProducttypeupdateComponent } from './components/producttypeupdate/producttypeupdate.component';
import { ProducttypecreateComponent } from './components/producttypecreate/producttypecreate.component';
import { ProducttypedetailComponent } from './components/producttypedetail/producttypedetail.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path:  '', redirectTo:  'login', pathMatch:  'full' },

  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductdetailComponent },
  { path: 'products/create', component: ProductcreateComponent },
  { path: 'products/update/:id', component: ProductupdateComponent },

  { path: 'productmaterial', component: ProductmaterialComponent },
  { path: 'productmaterial/:id', component: ProductmaterialdetailComponent },
  { path: 'productmaterial/create', component: ProductmaterialcreateComponent },
  { path: 'productmaterial/update/:id', component: ProductmaterialupdateComponent },

  { path: 'producttype', component: ProducttypeComponent },
  { path: 'producttype/detail/:id', component: ProducttypedetailComponent },
  { path: 'producttype/create', component: ProducttypecreateComponent },
  { path: 'producttype/update/:id', component: ProducttypeupdateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
