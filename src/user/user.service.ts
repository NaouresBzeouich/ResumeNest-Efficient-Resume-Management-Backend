import {ConflictException, HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {CrudService} from "../common/service/crud.service";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserSubscribeDto} from "./dto/create-UserSubscribeDto";
import {LoginCreadentialsDto} from "./dto/create-LoginCreadentialsDto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private jwtService: JwtService,
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

  async login(credentials : LoginCreadentialsDto) {
    const {emailOrUsername, password} = credentials;
    const user = await this.userRepository.createQueryBuilder("user").where("user.username = :emailOrUsername or user.email = :emailOrUsername",
        {emailOrUsername: emailOrUsername,}).getOne();

    if(!user)
      throw new NotFoundException("username  not found  ! ");
    if ( password === user.password ) {

      const payload = {
        username : user.username,
        email : user.email,
        role : user.role
      }
      console.log(payload);

      const jwt = await this.jwtService.sign(payload);
      return {
        accessToken: jwt,
      }
    }
}
}
