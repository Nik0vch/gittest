import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

export class RedisService {
    constructor(private redis = createClient({
        url: 'redis://127.0.0.1:6379',   //redis[s]://[[username][:password]@][host][:port][/db-number]
    })) {
        redis.connect();
    }

    async set(key: string, value: string, EX: number = null) {
        if (EX) return this.redis.set(key, value, { EX });
        else return this.redis.set(key, value,);
    }

    async hset(key: string, field: string, value: string, EX: number = null) {
        const result = this.redis.hSet(key, field, value);
        if (EX) this.redis.expire(key, EX);
        return result;
    }

    async get(key) {
        return this.redis.get(key);
    }

    async hget(key, field) {
        return this.redis.hGet(key, field);
    }

    async hgetAll(key) {
        return this.redis.hGetAll(key);
    }

    async exists(key) {
        return this.redis.exists(key);
    }

    async expire(key, EX) {
        return this.redis.expire(key, EX);
    }

    async sadd(key, value, EX = null) {
        const result = this.redis.sAdd(key, value);
        if (EX) this.redis.expire(key, EX);
        return result;
    }

    async smembers(key) {
        return this.redis.sMembers(key);
    }


    // async onModuleInit() {
    //     console.log(await this.hgetAll('aaa'));
    // }
}
