import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class Answer{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @Column()
  score:number;
  @ManyToOne(()=>Test,test=>test.answers)
  test:Test
}