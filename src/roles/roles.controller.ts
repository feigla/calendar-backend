import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {RoleGuard} from "../auth/guards/role.guard";
import {Roles} from "../decorators/role.decorator";

@Controller('roles')
export class RolesController {
    constructor(private RolesService: RolesService) {}

    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Post()
    createRole(@Body() roleDot: CreateRoleDto) {
        return this.RolesService.createRole(roleDot)
    }

    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Get()
    getRoles() {
        return this.RolesService.getRoles()
    }

    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Get('/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.RolesService.getRoleByValue(value)
    }
}
