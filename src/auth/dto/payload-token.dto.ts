import {Role} from "../../roles/roles.model";

export class PayloadTokenDto {
    readonly id: number
    readonly username: string
    readonly roles: Role[]
}