import { Restorant } from '../restorans/restorant.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { CartItem } from '../cart/cart-item.entity';

export enum StatusOfOrder {
  CREATED = 'CREATED',
  PAYMENT = 'PAYMENT',
  DELIVERY = 'DELIVERY',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
  ERROR = 'ERROR',
}

@Entity()
export class RestaurantCart{
  @PrimaryGeneratedColumn()
  id:number;
  @ManyToOne(()=>Restorant,res=>res)
  restaurant:Restorant
  @ManyToOne(() => Order, order => order.restorantItems)
  order: Order;
  @Column({ default: 0, type: 'float' })
  totalPrice: number;
  @Column({
    type: 'enum',
    enum: StatusOfOrder,
    default: 'CREATED',
  })
  status: StatusOfOrder;
  @OneToMany(() => CartItem, cart => cart.order)
  items: CartItem[];
}