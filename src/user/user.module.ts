import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from "dotenv";
import * as process from "node:process";
import {JwtStrategy} from "./jwt.strategy";
dotenv.config();

@Module({
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  imports: [TypeOrmModule.forFeature([User]),
      PassportModule.register({
        defaultStrategy: "jwt"
      }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
      }),
  ],
})
export class UserModule {}
