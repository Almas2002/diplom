import { ApiProperty } from '@nestjs/swagger';
import { StatusOfOrder } from './restaurant-cart.entity';


export class CreateOrderDto {
  @ApiProperty({ example: '42', description: 'офис или квартира' })
  apartment: string;
  @ApiProperty({ example: 'Жанаталап', description: 'ройон или местность' })
  building: string;
  @ApiProperty({ example: 'Койбагар', description: 'Улица' })
  address: string;
  @ApiProperty({ example: '87075545401', description: 'телефон номер заказщика' })
  phone: string;
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