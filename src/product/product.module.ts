import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { FileModule } from '../file/file.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), FileModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports:[ProductService]
})
export class ProductModule {

}