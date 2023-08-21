import {ApiProperty} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class LoginUsersDto {
  
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  password: string;

}
