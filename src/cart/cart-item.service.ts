import { CartItem } from './cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemDto } from './cart.dto';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { RestaurantCart } from '../order/restaurant-cart.entity';
import { ProductService } from '../product/product.service';

export class CartItemService {
  constructor(@InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>, private productService: ProductService) {
  }

  async create(dto: CartItemDto, userId: number): Promise<{ id: number }> {
    const product = await this.productService.getProductById(dto.productId);
    let candidate: CartItem;
    const query = this.cartItemRepository.createQueryBuilder('item')
      .andWhere('item.user_id = :userId', { userId })
      .andWhere('item.product_id = :productId', { productId: product.id })
      .andWhere('item.order_id IS NULL');
    candidate = await query.getOne();
    if (candidate) {
      await this.plusQtyCartItem(candidate.id);
      return;
    }
    const totalPrice = (product.price * dto.qty)
    const cartItem = await this.cartItemRepository.save({
      user: { id: userId },
      product: { id: dto.productId },
      qty: dto.qty,
      totalPrice,
    });
    return { id: cartItem.id };
  }


  async getCartItemsFotCart(userId: number) {
    const query = this.cartItemRepository.createQueryBuilder('items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('product.restaurant', 'restaurant')
      .where('items.user_id = :userId', { userId })
      .andWhere('items.order_id IS NULL');
    return await query.getMany();
  }

  async updateCartItemToOrder(id: number, orderMarket: RestaurantCart) {
    const item = await this.cartItemRepository.findOne({ where: { id } });
    item.order = orderMarket;
    await this.cartItemRepository.save(item);
  }


  async plusQtyCartItem(id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new HttpException('такой вещь не найден', 404);
    }
    const price = (item.totalPrice / item.qty);
    item.totalPrice += price;
    item.qty += 1;
    await this.cartItemRepository.save(item);
  }

  async minceQryCartItem(id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id } });
    if (item.qty == 1) {
      await this.deleteCartItem(item.id);
      return;
    }
    const price = item.totalPrice / item.qty;
    item.totalPrice -= price;
    item.qty -= 1;
    await this.cartItemRepository.save(item);

  }

  async deleteCartItem(id: number) {
    await this.cartItemRepository.delete({ id });
  }
}