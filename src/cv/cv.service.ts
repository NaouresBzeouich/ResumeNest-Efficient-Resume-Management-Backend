import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {Cv} from "./entities/cv.entity";
import {CrudService} from "../common/service/crud.service";

@Injectable()
export class CvService extends CrudService<Cv> {
  constructor(
      @InjectRepository(Cv)
      private cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }
}
