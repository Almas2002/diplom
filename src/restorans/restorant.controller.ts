import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RestorantService } from './restorant.service';
import { CreateRestorantDto } from './restorant.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestorantController {
  constructor(private restorantService: RestorantService) {
  }
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body()dto: CreateRestorantDto, @UserDecorator('id')id: number) {
    return this.restorantService.create(dto, id);
  }
  @Get()
  async getRestaurants(){
    return this.restorantService.getAll()
  }
  @ApiBearerAuth()
  @Get("my")
  @UseGuards(AuthGuard)
  async getMyRestaurant(@UserDecorator('id')id: number){
    return this.restorantService.my(id)
  }

  @Get(":uuid")
  async getOne(@Param('uuid')uiid:string){
    return this.restorantService.getByUiid(uiid)
  }
}