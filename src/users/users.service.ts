import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private usersRepo: typeof User,
        private rolesService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepo.create(dto)
        const role = await this.rolesService.getRoleByValue('ADMIN')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getUsers() {
        const users = await this.usersRepo.findAll({include: {all: true}})
        return users
    }

    async getUserByName(username: string) {
        const user = await this.usersRepo.findOne({where: {username}, include: {all: true}})
        return user
    }
}
