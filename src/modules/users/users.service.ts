import { Injectable, Get } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users.entity';
import { registUsersDto } from '../auth/dto/registUsers.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
@Injectable()
export class UsersService {
   constructor(private usersRepository: UsersRepository) {}

   async getAll(){
      return this.usersRepository.getAll();
   }

   async getAllSort(sortCondition:any){
      return this.usersRepository.getByFilter(sortCondition);
   }

   async getOneById(id:number){
      return this.usersRepository.getOneById(id);
   }

   async getOneByEmail(email:string){
      return this.usersRepository.getOneByEmail(email);
   }

   async getPasswordByEmail(email:string):Promise<string>{
      return this.usersRepository.getPasswordByEmail(email)
   }

   async addUser(user:registUsersDto){
      this.usersRepository.createUser(user);
   }

   async deleteOneById(id: number){
      this.usersRepository.delete(id);
   }

   async changUser(id:number, first_name:string, last_name:string, age:number){
      this.usersRepository.change(id, first_name, last_name, age)
   }

   async updateUserByEmail(email: string, dto: UserUpdateDto){
     return this.usersRepository.updateUserByEmail(email, dto);
   }

}