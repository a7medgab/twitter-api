import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SignupUserDto } from "./dto/user-signup.inputs";
import { LoginUserDto } from "./dto/user-login.inputs";
import { AccessToken } from "./access-token";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }
    @Mutation(() => AccessToken)
    signUp(@Args('newUser') user: SignupUserDto) {
        return this.authService.signUp(user);
    }

    @Mutation(() => AccessToken)
    login(@Args('user') user: LoginUserDto) {
        return this.authService.login(user);
    }
}