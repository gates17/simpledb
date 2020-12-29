import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProducttypeComponent,
    ProductmaterialComponent,
    ProductmaterialcreateComponent,
    ProductmaterialupdateComponent,
    ProductmaterialdeleteComponent,
    ProductmaterialdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
