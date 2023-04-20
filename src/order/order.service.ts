import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { RestaurantCart, StatusOfOrder } from './restaurant-cart.entity';
import { CartItemService } from '../cart/cart-item.service';
import { CreateOrderDto, OrderMarketQuery, OrderQuery } from './order.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService{
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
              @InjectRepository(RestaurantCart) private orderRestaurant: Repository<RestaurantCart>,
              private cartItemService: CartItemService) {
  }

  async createOrder(dto: CreateOrderDto, id: number): Promise<{ id: number }> {

    let product: Product;
    let order: Order;
    let totalPrice: number = 0;
    const orderProducts = await this.cartItemService.getCartItemsFotCart(id);
    if (!orderProducts.length) {
      throw new HttpException('У вас нету товаров в корзине', 400);
    }
    order = await this.orderRepository.save({ user:{id},
      address:dto.address,apartment:dto.apartment,building:dto.building,phone:dto.phone });
    let orderMarket: RestaurantCart = null;
    for (let i = 0; i < orderProducts.length; i++) {
      product = orderProducts[i].product;

      totalPrice += (product.price * orderProducts[i].qty)
      orderMarket = await this.orderRestaurant.findOne({ where: { restaurant: product.restaurant, order: order } });
      if (orderMarket) {
        await this.cartItemService.updateCartItemToOrder(orderProducts[i].id, orderMarket);
        await this.orderRestaurant.update({ id: orderMarket.id }, { totalPrice: orderMarket.totalPrice + (product.price * orderProducts[i].qty)  });
      } else {
        orderMarket = await this.orderRestaurant.save({ restaurant: product.restaurant, order: order ,});
        await this.cartItemService.updateCartItemToOrder(orderProducts[i].id, orderMarket);
        await this.orderRestaurant.update({ id: orderMarket.id }, { totalPrice: orderMarket.totalPrice + (product.price * orderProducts[i].qty)  });
      }

    }
    if (totalPrice === 0) {
      await this.orderRepository.delete({ id: order.id });
      throw new HttpException('Сумма должна быть больше чем 0', 400);
    }
    await this.orderRepository.update({ id: order.id }, { totalPrice: totalPrice });
    return { id: order.id };
  }

  async getOrderById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['marketOrders', 'marketOrders.items','marketOrders.market','marketOrders.items.product','marketOrders.items.product.images'],
    });
  }
  async getOrdersToMarket(dto:OrderMarketQuery,userId:number){
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = this.orderRestaurant.createQueryBuilder("order")
      .leftJoin("order.restaurant","restaurant")
      .where("restaurant.user_id = :userId",{userId})
      .leftJoinAndSelect('order.items','items')
      .leftJoinAndSelect('items.product', 'product')
    if(dto?.status){
      query.andWhere("order.status = :status",{status:dto.status})
    }

    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };

  }

  async getOrdersToMarketOne(id:number){
    return await this.orderRestaurant.findOne({where:{id},relations:["items","items.product"]})
  }
  async getOrdersMarketUpdate(id:number,status:StatusOfOrder){
    await  this.orderRestaurant.update({id},{status})
  }

  async getOrder(dto: OrderQuery, userId: number): Promise<{ data: Order[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;

    const query = await this.orderRepository.createQueryBuilder('order')
      .andWhere('order.user_id = :userId', { userId })
      .leftJoinAndSelect('order.marketOrders', 'marketOrders')
      .leftJoinAndSelect('marketOrders.items','items')
      .leftJoinAndSelect('items.product', 'product');
    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }
}