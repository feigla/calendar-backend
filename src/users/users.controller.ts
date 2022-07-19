import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {RoleGuard} from "../auth/guards/role.guard";
import {Roles} from "../decorators/role.decorator";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }
}
