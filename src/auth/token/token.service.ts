import {Injectable} from '@nestjs/common';
import {UsersService} from "../../users/users.service";
import {PayloadTokenDto} from "../dto/payload-token.dto";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../users/users.model";
import {InjectModel} from "@nestjs/sequelize";
import {Token} from "./token.model";

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token) private tokenRepo: typeof Token,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    generateToken(user: User) {
        const payload: PayloadTokenDto = {id: user.id, username: user.username, roles: user.roles}
        return {
            accessToken: this.jwtService.sign(payload,
                {secret: process.env.TOKEN_SECRET_ACCESS, expiresIn: '30m'}),
            refreshToken: this.jwtService.sign(payload,
                {secret: process.env.TOKEN_SECRET_REFRESH, expiresIn: '30d'})
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.findToken(refreshToken)
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            await tokenData.save()
            return tokenData
        }
        const token = await this.tokenRepo.create({userId: userId, refreshToken})
        return token
    }

    async deleteToken(refreshToken) {
        return await this.tokenRepo.destroy({where: {refreshToken}})
    }

    validateRefreshToken(token): PayloadTokenDto {
        const tokenPayload = this.jwtService.verify(token, {secret: process.env.TOKEN_SECRET_REFRESH})
        return tokenPayload
    }

    validateAccessToken(token): PayloadTokenDto {
        const tokenPayload = this.jwtService.verify(token, {secret: process.env.TOKEN_SECRET_ACCESS})
        return tokenPayload
    }

    async findToken(refreshToken) {
        const tokenData = await this.tokenRepo.findOne({where: {refreshToken}})
        return tokenData
    }
}
