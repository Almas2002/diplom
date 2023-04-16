import { Category } from '../category/category.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restorant } from '../restorans/restorant.entity';
import { Comments } from '../comments/comments.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @ManyToOne(() => Category, category => category)
  category: Category;
  @ManyToOne(() => Restorant, res => res)
  restaurant: Restorant;
  @Column({ type: 'float' })
  calorie: number;
  @Column({default:0})
  price:number;
  @OneToMany(() => Comments, comments => comments.product,{cascade:true})
  comments: Comments[];
}