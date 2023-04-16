import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, ProductQuery } from './product.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>, private fileService: FileService) {
  }

  async create(dto: CreateProductDto, file: any): Promise<{ id: number }> {
    const fileName = await this.fileService.createFile(file);
    const product = await this.productRepository.save({
      image: fileName,
      restaurant: { id: dto.restaurantId },
      category: { id: dto.categoryId }, ...dto,
    });
    return { id: product.id };
  }

  async getProducts(dto: ProductQuery): Promise<{ data: Product[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoin('product.comments', 'comments')
      .select('product.id', 'id')
      .addSelect('product.title', 'title')
      .addSelect('product.description', 'description')
      .addSelect('product.image', 'image')
      .addSelect('product.calorie', 'calorie')
      .addSelect('product.price', 'price')
      .addSelect('AVG(comments.star) as rating')
      .orderBy('product.id', 'DESC')
      .groupBy('product.id');

    if (dto?.categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId: dto.categoryId });
    }

    if (dto?.restaurantId) {
      query.andWhere('product.restaurantId = :restaurantId', { restaurantId: dto.restaurantId });
    }

    if (dto?.title) {
      query.andWhere('product.title ILIKE :title', { title: `%${dto.title}%` });
    }
    query.limit(limit);
    query.offset(offset);

    const res = await query.getRawMany();
    const count = await query.getCount();
    return { data: res, count };
  }

  async getOne(id: number): Promise<{ product: Product, avg: number }> {
    const { avg } = await this.productRepository.createQueryBuilder('product')
      .leftJoin('product.comments', 'comments')
      .select('AVG(comments.star)', 'avg').getRawOne();
    const product = await this.productRepository.findOne({ where: { id }, relations: ['restaurant', 'category'] });
    return { product, avg };
  }

}