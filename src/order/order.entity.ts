import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantCart } from './restaurant-cart.entity';
import { User } from '../user/user.entity';

@Entity()
export class Order{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  apartment: string;
  @Column()
  building: string;
  @Column()
  address: string;
  @Column()
  phone: string;

  @OneToMany(() => RestaurantCart, market => market.order)
  marketOrders: RestaurantCart[];

  @ManyToOne(() => User, cart => cart.orders)
  @JoinColumn({name:"user_id"})
  user: User;

  @Column({ default: 0, type: 'float' })
  totalPrice: number;
}