import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUsersDto {

  @ApiProperty({ type: String, description: "Почта пользователя" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: "Пароль пользователя" })
  @IsNotEmpty()
  @IsString()
  password: string;

}
