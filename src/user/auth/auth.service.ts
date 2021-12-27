import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtSecret } from './global-constants';
import { LoginUserDto } from './dto/user-login.inputs';
import * as bcrypt from 'bcrypt';
import { JwtPayLoad } from 'src/user/jwt/jwt-payload.interface';
import { SignupUserDto } from './dto/user-signup.inputs';

@Injectable()
export class AuthService {

    constructor(private usersService: UserService, private readonly jwtService: JwtService,) { }

    async signUp(user: SignupUserDto) {
        const { name, email, password } = user;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            const error = new Error('user exists already');
            throw error;
        }
        const createdUser = this.usersService.createUser(name, email, hashedPassword);

        return { token: this.generateToken(email) };
        ;

    }
    async login(user: LoginUserDto) {
        const { email, password } = user;
        const isAuthorized = await this.usersService.getUserByEmail(email);
        if (!isAuthorized) {
            const error = new Error('user not found');
            throw error;
        }
        const isEqual = await bcrypt.compare(password, isAuthorized.password);
        if (!isEqual) {
            const error = new Error('password is incorrect');
            throw error;

        }


        return { token: this.generateToken(email) };


    }
    async generateToken(email: string): Promise<string> {
        const payload: JwtPayLoad = { email };
        const accessToken: string = await this.jwtService.sign({ payload });
        return accessToken;
    }
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            const error = new Error('user not found');
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('password is incorrect');
            throw error;
        }
        return user;
    }


    async verify(token: string): Promise<User> {
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        })
        const user = this.usersService.getUserByEmail(decoded.email);
        if (!user) {
            const error = new Error('user not found');
            throw error;
        }
        return user;
    }
}
