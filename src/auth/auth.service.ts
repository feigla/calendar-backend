import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import {TokenService} from "./token/token.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService
    ) {}

    async registration(dto: CreateUserDto) {
        const isExisting = await this.usersService.getUserByName(dto.username)
        if(isExisting) {
            throw new HttpException('User is existing with that name', HttpStatus.BAD_REQUEST)
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.createUser({...dto, password: hash})
        const tokens = this.tokenService.generateToken(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return tokens
    }

    async login(dto: CreateUserDto) {
        const user = await this.usersService.getUserByName(dto.username)
        if(!user) {
            throw new UnauthorizedException({message: 'User is not existing with that name or incorrect password'})
        }
        const hash = await bcrypt.compare(dto.password, user.password);
        if (!hash) {
            throw new UnauthorizedException({message: 'User is not existing with that name or incorrect password'})
        }
        const tokens = this.tokenService.generateToken(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return tokens
    }

    async logout(refreshToken) {
        return await this.tokenService.deleteToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedException({message: 'Unauthorized'})
        }
        const tokenPayload = await this.tokenService.validateRefreshToken(refreshToken)
        const tokenData = await this.tokenService.findToken(refreshToken)
        if (!tokenPayload && !tokenData) {
            throw new UnauthorizedException({message: 'Unauthorized'})
        }
        const user = await this.usersService.getUserByName(tokenPayload.username)
        const tokens = this.tokenService.generateToken(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return tokens
    }
}
