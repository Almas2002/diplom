import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentsQuery, CreateCommentsDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comments) private commentsRepository: Repository<Comments>) {}


  async create(dto: CreateCommentsDto): Promise<{ id: number }> {
    if(!dto.restaurantId && !dto.productId ){
      throw new HttpException("должен быть айди продукта или айди ресторана",400)
    }
    const comment = await this.commentsRepository.save({
      restaurant: { id: dto.restaurantId || null },
      product: { id: dto.productId || null }, description:dto.description,email:dto.email,star:dto.star,name:dto.name,title:dto.title,
    });
    return { id: comment.id };
  }

  async getComments(dto: CommentsQuery) {
    const query = await this.commentsRepository.createQueryBuilder('comments')
      .orderBy('comments.id', 'DESC');

    if (dto?.productId) {
      query.andWhere('comments.productId = :productId', { productId: dto.productId });
    }

    if (dto?.restaurantId) {
      query.andWhere('comments.restaurantId = :restaurantId', { restaurantId: dto.restaurantId });
    }

    return await query.getMany();
  }
}
