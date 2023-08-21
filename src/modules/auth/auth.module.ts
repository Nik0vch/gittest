import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from 'src/guards/jwt-guards';
import { JwtStrategy } from 'src/strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService ,JwtStrategy, JwtService],
})
export class AuthModule {}
