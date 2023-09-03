import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { UserEntity } from 'src/modules/users/users.entity';

export class registUsersDto {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String, description: "Имя пользователя" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  first_name: string;

  @ApiProperty({ type: String, description: "Фамилия пользователя" })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  last_name: string;

  @ApiProperty({ type: Number, description: "Возвраст пользователя" })
  @IsNumber()
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @ApiProperty({ type: String, description: "Почта пользователя" })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({ type: String, description: "Пароль пользователя" })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

}
