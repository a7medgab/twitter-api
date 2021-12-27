import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Console } from 'console';
import { getUser } from 'src/user/auth/get-user.decorator';
import { GqlAuthGuard } from 'src/user/auth/guards/gql-auth.guards';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './entities/tweet.entity';
import { TweetService } from './tweet.service';

@Resolver(() => Tweet)
export class TweetResolver {
    constructor(private readonly tweetService: TweetService) { }
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Tweet)
    createTweet(@getUser() user, @Args('tweetContent') createTweetInputs: CreateTweetDto) {
        return this.tweetService.createTweet(createTweetInputs, user);
    }
    @UseGuards(GqlAuthGuard)
    @Query(() => [Tweet])
    getUsersTweets(@Args('page') page: number) {
        return this.tweetService.getUsersTweets(page);
    }
}
