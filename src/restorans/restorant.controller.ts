import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RestorantService } from './restorant.service';
import { CreateRestorantDto, QueryRestaurants } from './restorant.dto';
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
  @ApiQuery({ name: 'categoryId', required: false })
  async getRestaurants(@Query()query: QueryRestaurants) {
    return this.restorantService.getAll(query);
  }

  @ApiBearerAuth()
  @Get('my')
  @UseGuards(AuthGuard)
  async getMyRestaurant(@UserDecorator('id')id: number) {
    return this.restorantService.my(id);
  }

  @Get(':uuid')
  async getOne(@Param('uuid')uiid: string) {
    return this.restorantService.getByUiid(uiid);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/add-category/:id')
  async addCategory(@Param('id')id:number,@UserDecorator('id')userId: number){
    return this.restorantService.addCategory(id,userId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('/remove-category/:id')
  async removeCategory(@Param('id')id:number,@UserDecorator('id')userId: number){
    return this.restorantService.removeCategory(id,userId)
  }

}