import { BadRequestException, Injectable } from '@nestjs/common';
import { registUsersDto } from './dto/registUsers.dto';
import { UsersService } from '../users/users.service';
import { LoginUsersDto } from './dto/loginUser.dto';
import { TokenService } from '../token/token.service';
const crypto = require('crypto');

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UsersService,
        private readonly tokenService:TokenService
        )
    {}

    private passwordToHash(password:string):string{
        return crypto.createHash ('sha256').update(password).digest('hex');
    }

    async registration(user:registUsersDto){
        const existUser = await this.usersService.getOneByEmail(user.email);
        if(existUser) {
            throw new  BadRequestException("Пользователь с таким email уже существует");
        }
        user.password = this.passwordToHash(user.password);
        return this.usersService.addUser(user);         
    }

    async login(user:LoginUsersDto){
        const existUser = await this.usersService.getOneByEmail(user.email);
        if(!existUser || (await this.usersService.getPasswordByEmail(user.email) != this.passwordToHash(user.password))) {
            throw new  BadRequestException("Неверный логин или пароль");
        }
        const userData = {
            email:user.email,
            first_name:existUser.first_name
        }
        const token = await this.tokenService.genetateJwtToken({userData});
        return {...existUser, token};
    }
}
