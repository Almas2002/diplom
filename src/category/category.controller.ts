import { Body, Controller, Get, HttpException, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, QueryCategories } from './category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }


  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  create(@Body()dto: CreateCategoryDto, @UploadedFile()file) {
    if (!file) {
      throw  new HttpException('file dont exits', 400);
    }
    return this.categoryService.createCategory(dto, file);
  }

  @Get()
  getCategories(@Query()query:QueryCategories) {
    return this.categoryService.getCategories(query);
  }
}