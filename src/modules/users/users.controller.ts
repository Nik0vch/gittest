import { Body, Controller, Get, Post, Param, Delete, Put, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service'
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/userResponse.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsersAll(@Request() req) {
        const query = req.query;
        const sortCondition = {
            'first_name': query.first_name ?? null,
            'last_name': query.last_name ?? null,
            'age': query.age ?? null,
            'activ': query.activ ?? null,
            'sort': query.sort ?? null,
            'order': query.order ?? '',//asc - по возрастанию, desc - по убыванию
            'page': query.page ?? 1,
            'perPage': query.perPage ?? null,
        }
        return this.usersService.getAllSort(sortCondition);
    }


    @Get(':id')//Запрос пользователя по id 
    @ApiOkResponse({ type: UserResponseDto })
    @ApiParam({ name: 'id', type: Number })
    async getUserById(@Param() params: any) {
        const user = await this.usersService.getOneById(params.id);
        return plainToClass(UserResponseDto, user);
    }

    @Delete(':id')//Удаление пользователя по id 
    @ApiOkResponse({ type: UserResponseDto })
    @ApiParam({ name: 'id', type: Number })
    async remove(@Param() params: any) {
        return await this.usersService.deleteOneById(params.id)

    }

    // @Put(':id')//Редактирование пользователя по id
    // @ApiCreatedResponse()
    // @ApiParam({ name: 'id', type: Number })
    // async change(@Body() body: UserDto, @Param() params: any) {
    //     return await this.usersService.changUser(params.id, body.first_name, body.last_name, body.age)
    // }

}