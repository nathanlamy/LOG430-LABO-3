import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Magasin API')
    .setDescription('Developped by Nathan Lamy')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-magasin', app, document);

  await app.listen(3000);
}
bootstrap()
  .then(() => {
    console.log('Application is running on: http://localhost:3000');
    console.log(
      'Swagger UI is available at: http://localhost:3000/api-magasin',
    );
  })
  .catch((error) => {
    console.error('Error during application bootstrap:', error);
  });
