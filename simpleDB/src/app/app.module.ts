import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

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
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
