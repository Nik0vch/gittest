import { IsEmail, IsInt, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {nullable: false})
  first_name: string;

  @Column('text', {nullable: false})
  last_name: string;

  @Column('int', {nullable: false})
  age: number;
  
  @Column('text', {nullable: false})
  email: string;
  
  @Column('text', {select: false, nullable: false})
  password: string;
}