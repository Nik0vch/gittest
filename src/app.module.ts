import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { TokenModule } from './modules/token/token.module';


@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
