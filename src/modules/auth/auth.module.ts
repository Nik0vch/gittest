import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from 'src/guards/jwt-guards';
import { JwtStrategy } from 'src/strategy';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    UsersModule, 
    TokenModule, 
    EmailModule, 
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, 
    JwtService,
  ],
})
export class AuthModule {}
