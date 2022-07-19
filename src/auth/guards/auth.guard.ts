import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (!token || !bearer) {
                throw new UnauthorizedException({message: 'Unauthorized'})
            }
            const tokenPayload = this.tokenService.validateAccessToken(token)
            req.user = tokenPayload
            return true
        } catch (e) {
            throw new UnauthorizedException({message: 'Unauthorized'})
        }
    }
}