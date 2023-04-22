import { InjectRepository } from '@nestjs/typeorm';
import { Restorant } from './restorant.entity';
import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateRestorantDto, QueryRestaurants } from './restorant.dto';
import { v4 } from 'uuid';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class RestorantService {
  constructor(@InjectRepository(Restorant) private restorantService: Repository<Restorant>, private userService: UserService,private categoryService:CategoryService) {
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
    return await this.restorantService.findOne({ where: { user: { id } } ,relations:["categories"]})
  }

  async addCategory(categoryId:number,userId:number){
    const restorant = await this.restorantService.findOne({ where: { user: { id: userId } },relations:["categories"] });
    if (!restorant) {
      throw new HttpException('у вас нет магазина', 404);
    }
    const category = await this.categoryService.getCategoryById(categoryId)
    if(!category){
      throw new HttpException('такой категорий не существует', 404);
    }
    restorant.categories = [category,...restorant.categories ]
    await this.restorantService.save(restorant)
  }
  async removeCategory(categoryId:number,userId:number){
    const restorant = await this.restorantService.findOne({ where: { user: { id: userId } },relations:["categories"] });
    if (!restorant) {
      throw new HttpException('у вас нет магазина', 404);
    }
    const category = await this.categoryService.getCategoryById(categoryId)
    if(!category){
      throw new HttpException('такой категорий не существует', 404);
    }
    const categories = restorant.categories.filter(e=>e.id !== category.id)
    restorant.categories = [...categories]
    await this.restorantService.save(restorant)
  }


}