import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'afip2024',
      database: 'smart-advice',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development! Set to false in production.,
      logging:true,
      logger:"advanced-console",
      namingStrategy: new SnakeNamingStrategy(),
    }),
    FormsModule,
  ],
})
export class AppModule {}
