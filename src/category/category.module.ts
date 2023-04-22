import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { FileModule } from '../file/file.module';
import { CategoryController } from './category.controller';

@Module({
  providers:[CategoryService],
  imports:[TypeOrmModule.forFeature([Category]),FileModule],
  controllers:[CategoryController],
  exports:[CategoryService]
})
export class CategoryModule{

}