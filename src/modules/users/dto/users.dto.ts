import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from '../users.entity';
import {Exclude, Type} from '@nestjs/class-transformer';
import { IsNumber, IsString, IsInt } from '@nestjs/class-validator';

export class UserDto {

  @ApiProperty({type: String})
  @IsString()
  first_name: string;

  @ApiProperty({type: String})
  @IsString()
  last_name: string;

  @ApiProperty({type: Number})
  @IsInt()
  age: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}


