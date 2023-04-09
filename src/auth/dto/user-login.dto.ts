import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({example:"87478015284",description:"номер телефона"})
  email:string;
  @ApiProperty({example:"12345",description:"пороль"})
  password:string;
}