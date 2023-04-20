import { Role } from '../role/role.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @ManyToMany(() => Role, role => role.users)
  roles: Role[];

  @OneToMany(()=>Order,Order=>Order)
  orders:Order[]
}