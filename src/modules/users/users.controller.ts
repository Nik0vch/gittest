import { Body, Controller, Get, Post, Param, Delete , Put, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {UsersService} from './users.service'
import { UserDto } from './dto/users.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { randomInt } from 'crypto';
import { query } from 'express';
import { UserResponseDto } from './dto/userResponse.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsersAll(@Request() req) {
        const query = req.query;
        const sortCondition = {
            'first_name':query.first_name??null,
            'last_name':query.last_name??null,
            'age':query.age??null,
            'sort':query.sort??null,
            'order':query.order??'',//asc - по возрастанию, desc - по убыванию
            'page':query.page??1,
            'perPage':query.perPage??null,
        }
        return this.usersService.getAllSort(sortCondition);
    }

    // @Get(':id')   
    // @ApiParam({name: 'id', type: Number}) 
    // getUserById(@Param() params: any) {
    //     return this.usersService.getOneById(params.id);
    // }

    @Get(':id') 
    @ApiOkResponse({type: UserResponseDto})
    @ApiParam({name: 'id', type: Number})
    async getUserById(@Param() params: any): Promise<UserResponseDto> {
        const user = await this.usersService.getOneById(params.id);
        return new UserResponseDto(user);
        // console.log(user);
        // return plainToClass(UserResponseDto, user, {
        //     excludeExtraneousValues: true,
        //     enableImplicitConversion: true
        // });
    }
 
    @Delete(':id')
    @ApiParam({name: 'id', type: Number})
    remove(@Param() params: any){
        this.usersService.deleteOneById(params.id)
        return
    }

    @Put(':id')
    @ApiParam({name: 'id', type: Number})
    change(@Body() body: UserDto, @Param() params: any): void{
        this.usersService.changUser(params.id, body.first_name, body.last_name, body.age)
    }

}