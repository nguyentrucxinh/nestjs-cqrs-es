import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentOptions = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .setBasePath(`/${config.PREFIX}`)
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  app.setGlobalPrefix(config.PREFIX);
  app.enableCors();
  SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);
  app.listen(config.PORT, () => console.log(`Application is listening on port ${config.PORT}.`));
}
bootstrap();