import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from '../users.entity';
import {Exclude, Expose} from 'class-transformer';
import { IsNumber, IsString, IsInt, IsEmail } from '@nestjs/class-validator';

export class UserResponseDto {
  
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  
  @Exclude()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  age: number;

  @Exclude()
  email: string;

  @Exclude()
  password: string;

}