import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WhoToFollowDto } from './dto/who-to-follow.dto';
import { WhoUserfollow } from './entities/who-user-follow.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/user/auth/guards/gql-auth.guards';
import { UseGuards } from '@nestjs/common';
import { getUser } from 'src/user/auth/get-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  getAllUsers(@getUser() user, @Args('page') page: number) {
    return this.userService.getAllUsers(page);
  }
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMyTweets(@getUser() user) {
    return this.userService.getMytweets(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WhoUserfollow)
  followUser(@getUser() user, @Args('WhoToFollowID') WhoToFollowDto: WhoToFollowDto) {
    return this.userService.createUserFollowRelation(WhoToFollowDto, user);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getMyfollowers(@getUser() user) {
    return this.userService.getMyfollowers(user);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  whoIFollow(@getUser() user) {
    return this.userService.whoIFollow(user);
  }
}
