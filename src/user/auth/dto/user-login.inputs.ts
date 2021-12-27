import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
@InputType()
export class LoginUserDto {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    password: string;
}