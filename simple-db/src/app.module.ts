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
  ],
  controllers: [
    AppController,
    ProductsController,
    ProducttypeController,
    ProductmaterialController,
    UsersController,
  ],
  providers: [
    AppService,
    ProducttypeService,
    ProductmaterialService,
    ProductsService,
    UsersService,
  ],
})
export class AppModule {}
