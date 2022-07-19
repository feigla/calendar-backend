import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Role} from "./roles.model";
import {UserRoles} from "./user-roles.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
      AuthModule
  ],
  exports: [
      RolesService
  ]
})
export class RolesModule {}
