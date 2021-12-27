import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TweetModule } from './tweet/tweet.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { Tweet } from './tweet/entities/tweet.entity';
import { WhoUserfollow } from './user/entities/who-user-follow.entity';
import { AuthModule } from './user/auth/auth.module';

@Module({
  imports: [UserModule, GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
  }),
    TweetModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'twitter-db',
      models: [User, Tweet, WhoUserfollow],
      autoLoadModels: true,
      synchronize: true,

    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
