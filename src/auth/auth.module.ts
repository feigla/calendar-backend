import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";
import {Token} from "./token/token.model";
import {TokenService} from "./token/token.service";

@Module({
    providers: [AuthService, TokenService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({}),
        SequelizeModule.forFeature([User, Role, Token])
    ],
    exports: [
        AuthService,
        TokenService,
        JwtModule
    ]
})
export class AuthModule {
}
