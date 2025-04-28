import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Указываем фронтенд-URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Методы HTTP
    credentials: true, // Если вы используете cookies или авторизацию
  });

  await app.listen(3000);
}
bootstrap();