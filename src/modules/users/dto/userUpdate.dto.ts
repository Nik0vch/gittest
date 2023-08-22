import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from '../users.entity';
import { IsNumber, IsString, IsInt } from '@nestjs/class-validator';
import { IsEmail } from 'class-validator';
import { Injectable } from '@nestjs/common';


export class UserUpdateDto {
constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
}

  @ApiProperty({type: String})
  @IsString()
  first_name: string;

  @ApiProperty({type: String})
  @IsString()
  last_name: string;

  @ApiProperty({type: Number})
  @IsInt()
  age: number;

//   @ApiProperty({type: String})
//   @IsEmail()
//   email: string;

//   @ApiProperty({type: String})
//   @IsString()
//   password: string;
  
}


