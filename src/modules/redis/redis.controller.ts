import { Controller, Get, Post, Request } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
    constructor(private redis: RedisService) { }

    @Get('set')
    async set() {
        return await this.redis.set("aaa", "bbb");
    }

    @Get('hset')
    async hset() {
        return await this.redis.hset("aaa", "bbb", "ccc");
    }

    @Get('get')
    async get() {
        return await this.redis.get("aaa");
    }

    @Get('hget')
    async hget() {
        return await this.redis.hget("aaa", "bbb");
    }

    @Get('hgetAll')
    async hgetAll() {
        return await this.redis.hgetAll("aaa");
    }

    @Get('sadd')
    async sadd() {
        return await this.redis.sadd("mass", "obj2");
    }

    @Get('smembers')
    async smembers() {
        return await this.redis.smembers("mass");
    }

    @Get('expire')
    async expire() {
        return await this.redis.expire("aaa", 10);
    }

}
