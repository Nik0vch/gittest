import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';
import { dataSourseOptions } from './datasource.config';



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourseOptions),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule { }