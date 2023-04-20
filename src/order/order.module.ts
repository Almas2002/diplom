import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { RestaurantCart } from './restaurant-cart.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductModule } from '../product/product.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order,RestaurantCart]),CartModule],
  controllers:[OrderController],
  providers:[OrderService]
})
export class OrderModule{

}