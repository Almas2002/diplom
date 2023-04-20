import { ApiProperty } from '@nestjs/swagger';

export class CreateRestorantDto{
  @ApiProperty()
  title:string
  @ApiProperty()
  categoryId:number
}

export class QueryRestaurants{
  categoryId:number
}