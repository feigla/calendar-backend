import {IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString({message: 'Должна быть строкой'})
    @Length(3, 10, {message: 'Не меньше 3 символов и не больше 10 символов'})
    readonly username: string

    @IsString({message: 'Должна быть строкой'})
    @Length(4, 50, {message: 'Не меньше 4 символов'})
    readonly password: string
}