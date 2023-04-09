import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto{
  @ApiProperty()
  title:string;
  @ApiProperty()
  description:string;
  @ApiProperty()
  categoryId:number
  @ApiProperty()
  calorie:number
  @ApiProperty()
  restaurantId:number
}
export class ProductQuery{
  limit:number;
  page:number;
  categoryId:number;
  restaurantId:number;
  title:string;
}