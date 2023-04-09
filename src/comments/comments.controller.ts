import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CommentsQuery, CreateCommentsDto } from './comments.dto';
import { log } from 'util';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {
  }


  @Post()
  async create(@Body()dto: CreateCommentsDto) {
    return await this.commentService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'productId', required: false })
  @ApiQuery({ name: 'restaurantId', required: false })
  async getComments(@Query()dto: CommentsQuery) {
    return this.commentService.getComments(dto);
  }
}