import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  title:string
}


export class QueryCategories{
  shopId:number
}