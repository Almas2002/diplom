import { ApiProperty } from '@nestjs/swagger';

export class CreateRestorantDto{
  @ApiProperty()
  title:string
}