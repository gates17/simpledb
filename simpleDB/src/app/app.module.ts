import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProducttypeComponent } from './components/producttype/producttype.component';
import { ProductmaterialComponent } from './components/productmaterial/productmaterial.component';
import { ProductmaterialcreateComponent } from './components/productmaterialcreate/productmaterialcreate.component';
import { ProductmaterialupdateComponent } from './components/productmaterialupdate/productmaterialupdate.component';
import { ProductmaterialdeleteComponent } from './components/productmaterialdelete/productmaterialdelete.component';
import { ProductmaterialdetailComponent } from './components/productmaterialdetail/productmaterialdetail.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductdeleteComponent } from './components/productdelete/productdelete.component';
import { ProductcreateComponent } from './components/productcreate/productcreate.component';
import { ProductupdateComponent } from './components/productupdate/productupdate.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { ProducttypedeleteComponent } from './components/producttypedelete/producttypedelete.component';
import { ProducttypecreateComponent } from './components/producttypecreate/producttypecreate.component';
import { ProducttypedetailComponent } from './components/producttypedetail/producttypedetail.component';
import { ProducttypeupdateComponent } from './components/producttypeupdate/producttypeupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProducttypeComponent,
    ProductmaterialComponent,
    ProductmaterialcreateComponent,
    ProductmaterialupdateComponent,
    ProductmaterialdeleteComponent,
    ProductmaterialdetailComponent,
    LoginComponent,
    SidebarComponent,
    ProductdeleteComponent,
    ProductcreateComponent,
    ProductupdateComponent,
    ProductdetailComponent,
    ProducttypedeleteComponent,
    ProducttypecreateComponent,
    ProducttypedetailComponent,
    ProducttypeupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
