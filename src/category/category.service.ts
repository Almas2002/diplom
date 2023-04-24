import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, QueryCategories } from './category.dto';
import { CategoryExitsException, CategoryNotFoundException } from './category.exception';
import { FileService } from '../file/file.service';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>, private fileService: FileService) {
  }

  async createCategory(dto: CreateCategoryDto, file: any): Promise<{ id: number }> {
    const candidate = await this.categoryRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new CategoryExitsException();
    }
    const fileName = await this.fileService.createFile(file);
    const category = await this.categoryRepository.save({ icon: fileName, title: dto.title });
    return { id: category.id };
  }

  async getCategories(dto: QueryCategories): Promise<Category[]> {
    const query = this.categoryRepository.createQueryBuilder('categories')
      .leftJoin('categories.restaurants', 'restaurants');

    if (dto?.shopId) {
      query.andWhere('restaurants.id = :shopId', { shopId: dto.shopId });
    }

    return await query.getMany();
  }

  async getCategoryById(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

}