import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const baseDir = __dirname;
        const entitiesPath = path.join(baseDir, '**/**.entity{.ts,.js}');
        const migrationPath = path.join(baseDir, '/../db/seed/*.{.ts,.js}');
        return {
          type: 'postgres' as const,
          host: configService.get('DATABASE_HOST', 'localhost'),
          port: configService.get<number>('DATABASE_PORT', 5432),
          username: configService.get('DATABASE_USERNAME', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'postgres'),
          database: configService.get<string>('DATABASE_SCHEMA', 'local'),
          synchronize: configService.get<boolean>(
            'DATABASE_SYNCHRONIZE',
            false,
          ),
          entities: [entitiesPath],
          migrations: [migrationPath],
        };
      },
    }),
    AuthenticationModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}