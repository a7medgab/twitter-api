import { Field, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { WhoUserfollow } from "./who-user-follow.entity";

@ObjectType()
@Table
export class User extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @Field()
  @Column
  name: string;
  @Field()
  @Column({ unique: true })
  email: string;
  @Field()
  @Column
  password: string;
  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets: Tweet[];


  @BelongsToMany(() => User, () => WhoUserfollow, 'followeeId', 'followerId')
  @Field(() => [User], { nullable: true })
  followers: User[];

  @BelongsToMany(() => User, () => WhoUserfollow, 'followerId', 'followeeId')
  @Field(() => [User], { nullable: true })
  follwing: User[];

}
