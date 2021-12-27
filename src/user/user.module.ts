import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { WhoUserfollow } from './entities/who-user-follow.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, WhoUserfollow])
    ,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'topSecret51',
    signOptions: { expiresIn: 3600 },
  }),],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule { }
