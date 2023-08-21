import {ApiProperty} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';

export class registUsersDto {

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  first_name: string;

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  last_name: string;

  @ApiProperty({type: Number})
  @IsNumber()
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;
  
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;
  
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

}
