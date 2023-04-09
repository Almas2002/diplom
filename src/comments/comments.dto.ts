import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  productId:number
  @ApiProperty()
  restaurantId:number
  @ApiProperty()
  star:number
}

export class CommentsQuery{
  productId:number;
  restaurantId:number;
}