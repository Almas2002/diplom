import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restorant } from '../restorans/restorant.entity';

@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @Column()
  icon:string

  @ManyToMany(()=>Restorant,res=>res.categories)
  restaurants:Restorant[]
}