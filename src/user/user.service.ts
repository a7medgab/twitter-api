import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { WhoToFollowDto } from './dto/who-to-follow.dto';
import { WhoUserfollow } from './entities/who-user-follow.entity';
import { perPage } from 'src/user/auth/global-constants';

@Injectable()
export class UserService {
    constructor(@InjectModel(User)
    private userModel: typeof User,
        @InjectModel(WhoUserfollow)
        private UserFollowingmodel: typeof WhoUserfollow,
        private jwtService: JwtService,
    ) { }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const createdUser = this.userModel.create({ name, email, password });
        if (!createdUser) {
            const error = new Error('Invalid Inputs');
            throw error;
        }
        return
    }
    async getUserByEmail(email: string): Promise<User> {
        const user = this.userModel.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error('user not found');
            throw error;
        }
        return user

    }

    async getAllUsers(page: number): Promise<User[]> {
        const offset = (page - 1) * perPage
        if (offset < 0) {
            const error = new Error('page must be greater than 0');
            throw error;
        }
        return this.userModel.findAll({ limit: perPage, offset: offset });

    }
    async getMytweets(user: User): Promise<User> {

        const tweetcount = await this.userModel.count({ where: { id: user.id }, include: [Tweet] });
        return this.userModel.findOne({ where: { id: user.id }, include: [Tweet] });
    }
    async createUserFollowRelation(
        WhoToFollowDto: WhoToFollowDto, user: User) {
        const { followeeId } = WhoToFollowDto
        const followee = await this.userModel.findOne({ where: { id: followeeId } });

        if (!followee) {
            throw new NotFoundException('User not found id: ' + followeeId);
        }


        return await this.UserFollowingmodel.create({ followerId: user.id, followeeId: followeeId });


    }
    async getMyfollowers(user: User): Promise<User> {
        const folllwerscount = await this.userModel.count({
            where: { id: user.id }, include: [{
                model: User
                , as: "followers"
            }]
        });

        return this.userModel.findOne({
            where: { id: user.id }, include: [{
                model: User
                , as: "followers"
            }]
        });

    }
    async whoIFollow(user: User): Promise<User> {
        const folllwingcount = await this.userModel.count({
            where: { id: user.id }
            , include: [{ model: User, as: "follwing" }]
        });
        return this.userModel.findOne({
            where: { id: user.id }
            , include: [{ model: User, as: "follwing" }]
        });

    }

}
