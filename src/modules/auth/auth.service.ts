import { BadRequestException, Injectable } from '@nestjs/common';
import { registUsersDto } from './dto/registUsers.dto';
import { UsersService } from '../users/users.service';
import { LoginUsersDto } from './dto/loginUser.dto';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';
import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';
const crypto = require('crypto');

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UsersService,
        private readonly tokenService:TokenService,
        private readonly emailService:EmailService,
        private readonly redis:RedisService,
        private readonly configService: ConfigService,
        )
    {}

    private passwordToHash(password:string):string{
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async registration(user:registUsersDto){
        const existUser = await this.usersService.getOneByEmail(user.email);
        if(existUser) {
            throw new  BadRequestException("Пользователь с таким email уже существует");
        }
        
        try{
            const send = await this.emailService.sendOnEmail(
                user.email, 
                "Подтверждение регистрации в gittest", 
                "Подтвердите email перейдя по ссылке " +
                `http://${this.configService.get<string>("LOCALHOST_IP")}/auth/${this.passwordToHash(user.email)}`
            );
            if(send){
                this.redis.set(this.passwordToHash(user.email), user.email, 3600);
                user.password = this.passwordToHash(user.password);
                return this.usersService.addUser(user); 
            }
            else return false;
        }        
        catch(error){
            console.log(error);
        }
    }

    async actevatedUser(hash): Promise<boolean>{
        try{
            const email = await this.redis.get(hash);
            if(await this.usersService.activatedByEmail(email)){
                this.redis.del(hash);
                console.log(email + " активирован!");
                return true;
            }
            else return false;
        }
        catch(error){
            console.log(error);
        }
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
        const tokens = {
            access_token: await this.tokenService.genetateAccessToken({...userData}),
            refresh_token: await this.tokenService.generateRefreshToken({...userData})
        }
        return {...existUser, ...tokens};
    }

    async refreshToken(dataToken){
        const tokens = {
            access_token: await this.tokenService.genetateAccessToken({...dataToken}),
            refresh_token: await this.tokenService.generateRefreshToken({...dataToken})
        }
        return tokens;
    }


    async existToken(token){
        return await this.tokenService.existToken(token);
    }
    async existRefreshToken(token){
        return await this.tokenService.existRefreshToken(token);
    }
}
