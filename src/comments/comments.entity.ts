import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restorant } from '../restorans/restorant.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Comments{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @Column()
  description:string;
  @Column()
  name:string;
  @Column()
  email:string
  @Column()
  star:number;
  @ManyToOne(()=>Restorant,restorant=>restorant)
  restaurant:Restorant

  @ManyToOne(()=>Product,product=>product)
  product:Product
}