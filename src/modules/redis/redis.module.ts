import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Module({
  imports: [RedisService],
  providers: [RedisService],
  controllers: [RedisController]
})
export class RedisModule { }
