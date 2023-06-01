import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Put()
  @UseGuards(AuthGuard)
  update(@UserDecorator('id')id: number, @Body('score')score: number) {
    return this.userService.updateScore(id, score);
  }

  @Get('me')
  async userMe(@UserDecorator('id')id: number) {
    return this.userService.getUserId(id);
  }
}