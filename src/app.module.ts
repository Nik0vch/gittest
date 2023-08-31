import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { TokenModule } from './modules/token/token.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './modules/redis/redis.module';
import { CreateUsersTable1692954484446 } from './migrations/1692954484446-create_users_table.js';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    TokenModule,
    //RedisModule,
    ConfigModule.forRoot({ isGlobal: true }),

  ],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule { }
