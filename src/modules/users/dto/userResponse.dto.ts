import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from '../users.entity';
import {Exclude, Expose, Type} from '@nestjs/class-transformer';
import { IsNumber, IsString, IsInt, IsEmail } from '@nestjs/class-validator';

export class UserResponseDto {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({type: String})
  @Expose()
  first_name: string;

  @ApiProperty({type: String})
  @Expose()
  last_name: string;

  @ApiProperty({type: Number})
  @Expose()
  age: number;

}



