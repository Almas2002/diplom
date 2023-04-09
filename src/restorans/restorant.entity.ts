import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Comments } from '../comments/comments.entity';

@Entity()
export class Restorant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ unique: true })
  uuid: string;
  @OneToOne(() => User, user => user)
  @JoinColumn()
  user: User;
  @OneToMany(() => Product, product => product.restaurant)
  products: Product[];
  @OneToMany(() => Comments, comments => comments.restaurant,{cascade:true})
  comments: Comments[];
}