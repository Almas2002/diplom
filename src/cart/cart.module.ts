import { Controller, Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartItemService } from './cart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { ProductModule } from '../product/product.module';

@Module({
  controllers:[CartController],
  providers:[CartItemService],
  imports:[TypeOrmModule.forFeature([CartItem]),ProductModule],
  exports:[CartItemService]
})
export class CartModule{

}