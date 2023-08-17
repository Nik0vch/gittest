import { Injectable, Get } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users.entity';
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

   async addUser(firstName:string, lastName:string, age:number){
      this.usersRepository.createUser(firstName, lastName, age);
   }

   async deleteOneById(id: number){
      this.usersRepository.delete(id);
   }

   async changUser(id:number, first_name:string, last_name:string, age:number){
      this.usersRepository.change(id, first_name, last_name, age)
   }

}