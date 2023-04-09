import { Module } from '@nestjs/common';
import { RestorantService } from './restorant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restorant } from './restorant.entity';
import { UserModule } from '../user/user.module';
import { RestorantController } from './restorant.controller';

@Module({
  controllers: [RestorantController],
  providers:[RestorantService],
  imports:[TypeOrmModule.forFeature([Restorant]),UserModule]
})
export class RestorantModule {

}