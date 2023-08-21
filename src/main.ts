import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //To apply DTOs 
  app.useGlobalPipes(new ValidationPipe ());

  const config = new DocumentBuilder()
  .addBearerAuth({ in: "header", type: "http" })
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
