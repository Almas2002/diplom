import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:["*"],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE', 'OPTIONS'],

    //credentials:true
  })
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle("restaurant")
    .setDescription("Documentation for REST API")
    .setVersion("1.0.0")
    .addTag("restaurant")
    .addBearerAuth(
      undefined,
      'defaultBearerAuth',
    )
    .build();
  const documentation = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/api/docs",app,documentation)
  await app.listen(3000);
}
bootstrap();
