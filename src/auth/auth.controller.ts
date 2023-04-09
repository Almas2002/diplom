import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: 'login пользователя'})
  @ApiResponse({status: 201})
  @Post('login')
  async login(@Body()data: UserLoginDto, @Res({passthrough: true})res) {
    return await this.authService.login(data)
  }

  @ApiOperation({summary: 'registration пользователя'})
  @ApiResponse({status: 201})
  @Post('registration')
  async registration(@Body()data: UserLoginDto, @Res({passthrough: true})res) {
    return await this.authService.registration(data);
  }


  @ApiOperation({summary: 'создать супер админа пользователя'})
  @ApiResponse({status: 201})
  @Post('create-super-user')
  async createSuperUser(@Res({passthrough: true})res) {
    const data = {
      email: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD,
    };
    return await this.authService.registration(data, true);
  }

}