import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { RestaurantCart } from '../order/restaurant-cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, product => product)
  @JoinColumn({name:"product_id"})
  product: Product;
  @ManyToOne(() => User, user => user)
  @JoinColumn({name:'user_id'})
  user: User;
  @Column()
  qty: number;
  @Column({ type: 'float', default: 0 })
  totalPrice: number;

  @ManyToOne(()=>RestaurantCart,order=>order.items,{nullable:true,onDelete:"CASCADE"})
  @JoinColumn({name:"order_id"})
  order:RestaurantCart
}