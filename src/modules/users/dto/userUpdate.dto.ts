import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../users.entity';
import { IsNumber, IsString, IsInt } from 'class-validator';


export class UserUpdateDto {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String, description: "Имя пользователя" })
  @IsString()
  first_name: string;

  @ApiProperty({ type: String, description: "Фамилия пользователя" })
  @IsString()
  last_name: string;

  @ApiProperty({ type: Number, description: "Возраст пользователя" })
  @IsInt()
  age: number;

  //   @ApiProperty({type: String})
  //   @IsEmail()
  //   email: string;

  //   @ApiProperty({type: String})
  //   @IsString()
  //   password: string;

}


