import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import * as process from "node:process";
dotenv.config();
import { DataSource } from 'typeorm';
import {EventEmitter} from "typeorm/browser/platform/BrowserPlatformTools";
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
  imports: [
      CvModule, UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_Name,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
      EventEmitterModule.forRoot(),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
