import { ApiProperty } from '@nestjs/swagger';
import { StatusOfOrder } from './restaurant-cart.entity';


export class CreateOrderDto {
}

export class OrderQuery {
  limit: number;
  page: number;
}

export class OrderMarketQuery extends OrderQuery{
  status: StatusOfOrder
}

export class OrderMarketUpdate {
  @ApiProperty({ example: StatusOfOrder.CREATED, description: 'status',enum:StatusOfOrder})
  status: StatusOfOrder
}