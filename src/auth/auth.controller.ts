import {Body, Controller, Post, Res, Req, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/registration')
    async registration(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response) {
        const tokens = await this.authService.registration(dto)
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return tokens
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response) {
        const tokens = await this.authService.login(dto)
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return tokens
    }

    @Post('/logout')
    async logout(@Req() request, @Res({ passthrough: true }) response) {
        const {refreshToken} = request.cookies
        const tokens = await this.authService.logout(refreshToken)
        response.clearCookie('refreshToken')
        return tokens
    }

    @Get('/refresh')
    async refresh(@Req() request, @Res({ passthrough: true }) response) {
        const {refreshToken} = request.cookies
        const tokens = await this.authService.refresh(refreshToken)
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return tokens
    }
}
