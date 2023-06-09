import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Module({
  providers:[CommentsService],
  controllers:[CommentsController],
  imports:[TypeOrmModule.forFeature([Comments])]
})
export class CommentsModule{

}