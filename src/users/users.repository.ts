import {DataSource, Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {UserEntity} from './users.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

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

    return this.query('SELECT * FROM users ' + where + ' '+ orderBy + ' '+ limit + ' '+ offset + ';');
  }


  async createUser(firstName: string, lastName: string, age:number): Promise<UserEntity> {
    const user = new UserEntity();
    user.first_name = firstName;
    user.last_name = lastName;
    user.age = age;

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



}