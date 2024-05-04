import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cv} from "./entities/cv.entity";
import {User} from "../user/entities/user.entity";
import {CvListener} from "./CvListener";

@Module({
  controllers: [CvController],
  providers: [CvService, CvListener],
  imports: [TypeOrmModule.forFeature([Cv]),
            TypeOrmModule.forFeature([User])],
})
export class CvModule {}
