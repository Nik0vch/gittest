import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'test',
    entities: [
      UserEntity
        // __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
  }),],
  providers: [],
  exports: [],
})
export class DatabaseModule {}