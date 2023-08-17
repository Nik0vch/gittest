import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from '../users.entity';
import {Exclude, Type} from '@nestjs/class-transformer';
import { IsNumber, IsString } from '@nestjs/class-validator';

export class UserDto {
//   @ApiProperty({type: Number})
//   @IsNumber()
//   id: number;

  @ApiProperty({type: String})
  @IsString()
  first_name: string;

  @ApiProperty({type: String})
  @IsString()
  last_name: string;

  @ApiProperty({type: Number})
  @IsNumber()
  age: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}