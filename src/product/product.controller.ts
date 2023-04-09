import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, ProductQuery } from './product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body()dto: CreateProductDto, @UploadedFile()file: any) {
    return await this.productService.create(dto, file);
  }

  @Get()
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'categoryId', type: 'number', required: false })
  @ApiQuery({ name: 'restaurantId', type: 'number', required: false })
  @ApiQuery({ name: 'title', type: 'string', required: false })
  async getProduct(@Query()dto: ProductQuery) {
    return this.productService.getProducts(dto);
  }

  @Get(':id')
  async getOne(@Param('id')id: number) {
    return this.productService.getOne(id);
  }
}