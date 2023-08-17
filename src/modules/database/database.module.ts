import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'test',
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        UserEntity,
    ],
    synchronize: true,
  }),],
  providers: [],
  exports: [],
})
export class DatabaseModule {}