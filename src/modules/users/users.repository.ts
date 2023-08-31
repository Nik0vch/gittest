import {DataSource, Repository} from 'typeorm';
import {BadRequestException, Injectable} from '@nestjs/common';
import {UserEntity} from './users.entity';
import { registUsersDto } from '../auth/dto/registUsers.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,    
    ) {
    super(UserEntity, dataSource.createEntityManager());    
  }

  private TABLE_USERS = this.configService.get<string>("TABLE_USERS");


  async getAll(): Promise<UserEntity[]> {
    return this.find();
  }

  async getOneById(id: number): Promise<UserEntity | null> {
    return this.findOneBy({ id });
  }


  async getByFilter(sortCondition:any){
    let orderBy = '', where = '', offset = '', limit = '';

    if(sortCondition.first_name || sortCondition.last_name || sortCondition.age){
      where = 'where ';
      if(sortCondition.first_name) where += ('first_name = \'' + sortCondition.first_name + '\' and ');
      if(sortCondition.last_name) where += ('last_name = \'' + sortCondition.last_name + '\' and ');
      if(sortCondition.age) where += ('age = \'' + sortCondition.age + '\' and ');
      where = where.slice(0, -5);
    }

    if(sortCondition.sort) orderBy = 'order by ' + sortCondition.sort + ' ' + sortCondition.order;       

    if(sortCondition.perPage){
      limit = 'limit '+ sortCondition.perPage;
      offset = 'offset '+ (sortCondition.page - 1)*sortCondition.perPage;
    } 
    
    return this.query(`SELECT id, first_name, last_name, age, email FROM ${this.TABLE_USERS} ${where} ${orderBy} ${limit} ${offset};`);
  }

  
  async getPasswordByEmail(email:string){
    const query = this.query(`SELECT password FROM ${this.TABLE_USERS} where email = '${email}';`);    
    return query.then((result:UserEntity[])=>{return result[0].password});;
  }
  
  async getOneByEmail(email:string){
    return this.findOne({where:{ email }});
 }

  async createUser(user:registUsersDto): Promise<UserEntity> {
    return this.save(user);
  }

  async change(id:number, firstName: string, lastName: string, age:number){
    const user = new UserEntity();
    user.id = id;
    user.first_name = firstName;
    user.last_name = lastName;
    user.age = age;
    return this.save(user);
  }

  async updateUserByEmail(email: string, dto: UserUpdateDto){
    const user = await this.getOneByEmail(email);
    if (user) new BadRequestException("Нет пользователя с таким email");
    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.age = dto.age;
    return this.save(user);    
  }

}