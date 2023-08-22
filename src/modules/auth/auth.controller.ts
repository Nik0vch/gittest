import { BadRequestException, Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { registUsersDto } from './dto/registUsers.dto';
import { LoginUsersDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-guards';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express'
import { UserResponseDto } from '../users/dto/userResponse.dto';
import { UserUpdateDto } from '../users/dto/userUpdate.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

   constructor(
    private authService: AuthService,
    private userService: UsersService
    )
   {}

    @Post('regist')//Регистрация пользователя
    registration(@Body() user:registUsersDto){
        return this.authService.registration(user);
    }

    @Post('login')//Авторизация пользователя
    login(@Body() user:LoginUsersDto){
        return this.authService.login(user);        
    }

    //@UseGuards(JwtAuthGuard)//Смена токена
    @Post('refresh')
    async refreshToken(@Req() req: Request){
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        const dataToken = await this.authService.existRefreshToken(token);
        return await this.authService.refreshToken(dataToken.user);
    }


    @UseGuards(JwtAuthGuard)//Тестовая проверка на токен
    @Post('test')
    async test(@Req() req: Request){     
        const [type, token] = req.headers.authorization?.split(' ') ?? []; 
        return await this.authService.existToken(token);
    }
    
    @UseGuards(JwtAuthGuard)//редактирование авторизованного пользователя
    @Patch('update')
    async updateUser(@Req() req: Request, @Body() userUpdateDto: UserUpdateDto):Promise<UserResponseDto>{     
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        const dataToken = await this.authService.existToken(token);
        return await this.userService.updateUserByEmail(dataToken.user.email, userUpdateDto);
    }
}