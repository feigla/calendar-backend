import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../../decorators/role.decorator";
import {TokenService} from "../token/token.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector,
                private tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (!token || !bearer) {
                throw new UnauthorizedException({message: 'You have no rights'})
            }
            const tokenPayload = this.tokenService.validateAccessToken(token)
            req.user = tokenPayload
            return tokenPayload.roles.some(role => requiredRoles.includes(role.value))
        } catch (e) {
            throw new UnauthorizedException({message: 'You have no rights'})
        }
    }
}