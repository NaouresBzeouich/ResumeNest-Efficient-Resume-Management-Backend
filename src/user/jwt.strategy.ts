import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as dotenv from "dotenv";
import * as process from "node:process";
dotenv.config();
import { UnauthorizedException } from '@nestjs/common';
import {JwtPayload} from "./jwt-payload.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<Partial<User>> {
        const { username } = payload;
        const user = await this.userRepository.findOneBy({ username });

        if(!user)
            throw  new UnauthorizedException();

        return user ;
    }
}