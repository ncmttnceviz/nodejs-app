import {IsEmail, IsNotEmpty} from "class-validator";

export class TestDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string
}


