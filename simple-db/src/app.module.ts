import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from '@nestjsplus/knex';
import { ProductsController } from './products/products.controller';
import { ProducttypeController } from './producttype/producttype.controller';
import { ProductmaterialController } from './productmaterial/productmaterial.controller';
import { ProducttypeService } from './producttype/producttype.service';
import { ProductmaterialService } from './productmaterial/productmaterial.service';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ProducttypeModule } from './producttype/producttype.module';
import { ProductmaterialModule } from './productmaterial/productmaterial.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SalesHistoryController } from './sales-history/sales-history.controller';
import { SalesHistoryService } from './sales-history/sales-history.service';
import { SalesHistoryModule } from './sales-history/sales-history.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    KnexModule.register({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'bragap017',
        database: 'simpledb',
      },
    }),
    ProductsModule,
    ProducttypeModule,
    ProductmaterialModule,
    UsersModule,
    AuthModule,
    SalesHistoryModule,
    SearchModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    ProducttypeController,
    ProductmaterialController,
    UsersController,
    SalesHistoryController,
    SearchController,
  ],
  providers: [
    AppService,
    ProducttypeService,
    ProductmaterialService,
    ProductsService,
    UsersService,
    SalesHistoryService,
    SearchService,
    /*{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },*/
  ],
})
export class AppModule {}
