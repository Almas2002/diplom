import { ApiProperty } from '@nestjs/swagger';


export class CartItemDto{
  @ApiProperty()
  qty:number;
  @ApiProperty()
  productId:number


}

export class PlusQtyItem {
  id:number;
}