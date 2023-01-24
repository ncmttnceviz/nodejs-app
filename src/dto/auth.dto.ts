import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterDto {
    @IsString()
    firstname: string

    @IsString()
    lastname: string

    @IsEmail()
    email: string

    @MinLength(8)
    @MaxLength(16)
    password: string
}

export class LoginDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}