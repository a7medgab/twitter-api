import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class WhoToFollowDto {

    @Field()
    @IsNumber()
    @IsNotEmpty()
    followeeId: number;
}