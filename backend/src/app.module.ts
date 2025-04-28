//app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // Название контейнера PostgreSQL из docker-compose
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestdb',
      // autoLoadEntities: true, // Автоматическая загрузка сущностей
      // synchronize: true, // Не используйте на продакшене! Это для разработки
      entities: ['src/modules/**/*.entity.{ts,js}'],
      migrations: ['src/migrations/**/*.{ts,js}'],
      // cli: {
      //   entitiesDir: 'src/modules',
      //   migrationsDir: 'src/migrations',
      // },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}