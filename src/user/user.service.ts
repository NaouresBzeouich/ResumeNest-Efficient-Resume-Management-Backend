import {ConflictException, HttpException, Injectable} from '@nestjs/common';
import {CrudService} from "../common/service/crud.service";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserSubscribeDto} from "./dto/create-UserSubscribeDto";

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async subscribe(userData:UserSubscribeDto) : Promise<Partial<User>>{
    const {username ,password,email} = userData;
    let user = this.userRepository.create(
        {username,password,email});
    try {
      await this.userRepository.save(user);
    }catch(err){
      throw new ConflictException("  data redendent ! ");
    }
    return {
      id : user.id,
      username  : user.username,
      email : user.email,
      password : user.password
    } ;

  }
}
