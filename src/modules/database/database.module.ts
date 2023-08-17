import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


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
    ],
    synchronize: true,
  }),],
  providers: [],
  exports: [],
})
export class DatabaseModule {}