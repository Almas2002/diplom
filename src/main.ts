import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
