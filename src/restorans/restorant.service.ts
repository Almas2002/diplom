import { InjectRepository } from '@nestjs/typeorm';
import { Restorant } from './restorant.entity';
import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateRestorantDto, QueryRestaurants } from './restorant.dto';
import { v4 } from 'uuid';
import { UserService } from '../user/user.service';

@Injectable()
export class RestorantService {
  constructor(@InjectRepository(Restorant) private restorantService: Repository<Restorant>, private userService: UserService) {
  }

  async create(dto: CreateRestorantDto, userId: number): Promise<{ id: number }> {
    let candidate;
    candidate = await this.restorantService.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new HttpException('такой магазин существует', 400);
    }
    candidate = await this.restorantService.findOne({ where: { user: { id: userId } } });
    if (candidate) {
      throw new HttpException('у вас есть магазин', 400);
    }
    const res = await this.restorantService.save({
      title: dto.title,
      user: { id: userId },
      uuid: await v4(),
      category: { id: dto.categoryId },
    });
    await this.userService.addRoleForUser({ id: userId, role: 'MANAGER', email: null });
    return { id: res.id };
  }


  async getAll(dto: QueryRestaurants) {
    const query = this.restorantService.createQueryBuilder('restaurants');
    if (dto?.categoryId) {
      query.andWhere('restaurants.categoryId = :categoryId', { categoryId: dto.categoryId });
    }
    return await query.getMany();
  }

  async getByUiid(uuid: string) {
    return this.restorantService.findOne({ where: { uuid } });
  }

  async my(id: number) {
    return await this.restorantService.findOne({ where: { user: { id } } });
  }

}