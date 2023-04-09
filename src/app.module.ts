import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CategoryModule } from './category/category.module';
import { AuthMiddleware } from './middleware/auth.milddleaware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { RoleModule } from './role/role.module';
import { RestorantModule } from './restorans/restorant.module';
import { ProductModule } from './product/product.module';
import { CommentsModule } from './comments/comments.module';

require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }), CategoryModule,AuthModule,UserModule,FileModule,RoleModule,RestorantModule,ProductModule,CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
