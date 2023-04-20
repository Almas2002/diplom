import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restorant } from '../restorans/restorant.entity';

@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @Column()
  icon:string

  @OneToMany(()=>Restorant,restorant=>restorant)
  restaurants:Restorant[]
}