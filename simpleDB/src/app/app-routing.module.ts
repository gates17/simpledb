import { SearchComponent } from './components/search/search.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { ProductdeleteComponent } from './components/productdelete/productdelete.component';



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
  { path:  '',redirectTo: 'login', pathMatch:'full'},

  { path: 'search/:sp', component: SearchComponent, canActivate: [AuthGuardGuard]  },

  { path: 'products', component: ProductComponent, canActivate: [AuthGuardGuard]  },
  { path: 'products/detail/:id', component: ProductdetailComponent, canActivate: [AuthGuardGuard] },
  { path: 'products/create', component: ProductcreateComponent, canActivate: [AuthGuardGuard]  },
  { path: 'products/update/:id', component: ProductupdateComponent, canActivate: [AuthGuardGuard]  },
  { path: 'products/delete/:id', component: ProductdeleteComponent, canActivate: [AuthGuardGuard] },

  { path: 'productmaterial', component: ProductmaterialComponent, canActivate: [AuthGuardGuard]  },
  { path: 'productmaterial/detail/:id', component: ProductmaterialdetailComponent, canActivate: [AuthGuardGuard]  },
  { path: 'productmaterial/create', component: ProductmaterialcreateComponent, canActivate: [AuthGuardGuard]  },
  { path: 'productmaterial/update/:id', component: ProductmaterialupdateComponent, canActivate: [AuthGuardGuard] },

  { path: 'producttype', component: ProducttypeComponent, canActivate: [AuthGuardGuard]  },
  { path: 'producttype/detail/:id', component: ProducttypedetailComponent, canActivate: [AuthGuardGuard]  },
  { path: 'producttype/create', component: ProducttypecreateComponent, canActivate: [AuthGuardGuard]  },
  { path: 'producttype/update/:id', component: ProducttypeupdateComponent, canActivate: [AuthGuardGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: SidebarComponent, canActivate: [AuthGuardGuard], },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
