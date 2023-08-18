import {ApiProperty} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class registUsersDto {

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({type: Number})
  @IsNumber()
  @IsNotEmpty()
  age: number;
  
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  password: string;

}
