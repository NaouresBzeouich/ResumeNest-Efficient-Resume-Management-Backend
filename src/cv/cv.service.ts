import {Body, Injectable} from '@nestjs/common';
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
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
  ) {
    super(cvRepository);
  }

    async create(createCvDto: CreateCvDto): Promise<Cv> {
        // Fetch user by ID
        const user = await this.userRepository.findOneBy({ id: createCvDto.userId } );

        if (!user) {
            throw new Error('User not found');
        }

        // Create a new CV entity
        const cv = new Cv();
        cv.name = createCvDto.name;
        cv.firstname = createCvDto.firstname;
        cv.age = createCvDto.age;
        cv.Cin = createCvDto.Cin;
        cv.Job = createCvDto.Job;

        // Associate the CV with the user
        cv.user = user;

        // Save the CV in the database
        return await this.cvRepository.save(cv);
    }

    async findAll(options?: any): Promise<Cv[]> {
        return this.cvRepository.find(options);
    }
}
