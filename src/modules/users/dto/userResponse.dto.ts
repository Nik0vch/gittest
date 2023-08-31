import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../users.entity';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, IsInt, IsEmail } from 'class-validator';

export class UserResponseDto {

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty({ type: String, description: "Имя пользователя" })
  @Expose()
  first_name: string;

  @ApiProperty({ type: String, description: "Фамилия пользователя" })
  @Expose()
  last_name: string;

  @ApiProperty({ type: String, description: "Возраст пользователя" })
  @Expose()
  age: number;

  @ApiProperty({ type: String, description: "Почта пользователя" })
  @Expose()
  email: string;

  @Exclude()
  password: string;

}