import {
  Column,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Comments } from '../comments/comments.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Restorant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ unique: true })
  uuid: string;
  @OneToOne(() => User, user => user)
  @JoinColumn({name:"user_id"})
  user: User;
  @OneToMany(() => Product, product => product.restaurant)
  products: Product[];
  @OneToMany(() => Comments, comments => comments.restaurant,{cascade:true})
  comments: Comments[];

  @ManyToMany(()=>Category,category=>category.restaurants)
  @JoinTable()
  categories:Category[]
}