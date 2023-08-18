import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { registUsersDto } from './dto/registUsers.dto';
import { LoginUsersDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

   constructor(
    private authService: AuthService,
    private userService: UsersService
    )
   {}

    @Post('regist')
    registration(@Body() user:registUsersDto){
        return this.authService.registration(user);
    }

    @Post('login')
    login(@Body() user:LoginUsersDto){
        return this.authService.login(user);        
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('test')
    async test(@Req() req){     
        const a = await this.userService.getOneByEmail(req.user.email);
        console.log(a) ;
        return a;
    }
}