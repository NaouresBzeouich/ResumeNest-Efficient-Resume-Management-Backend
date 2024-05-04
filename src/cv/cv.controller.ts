import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {AuthGuardGuard} from "../user/auth-guard/auth-guard.guard";
import {EventEmitter2} from "@nestjs/event-emitter";
import {CV_EVENTS} from "./cv.events.config";
import {User} from "../user/entities/user.entity";
import {GetUser} from "../user/user.decorator";

@Controller('cv')
export class CvController {
  constructor(
      private readonly cvService: CvService ,
      private eventEmitter: EventEmitter2
  ) {}

  @Post()
  @UseGuards(AuthGuardGuard)
  async create(@Body() createCvDto: CreateCvDto,@GetUser() user : User) {
    const cv = await  this.cvService.create(createCvDto);
    this.eventEmitter.emit(CV_EVENTS.add, {cv,user});
    return cv ;
  }

  @Get()
  @UseGuards(AuthGuardGuard)
  findAll() {
    return this.cvService.findAll();
  }

  @Get('/ByUsers')
  async findByUsers() {
    return await this.cvService.findAll({relations: ['user']});
  }
  @Get('names')
  async findAllAsUser() {
    const cvs = await  this.cvService.findAll();
    const names = cvs.map(cv => cv.name);
    return names;
  }

  @Get('/ByUser')
  async findByUserId(@Body('id') id: string) {
    const cvs = await this.cvService.findAll({ relations: ['user'] });
    return cvs.filter(cv => cv.user?.id === id); // Use optional chaining to avoid errors if user is undefined
  }


  @Patch('/ById')
  @UseGuards(AuthGuardGuard)
  async update(
      @Body('id') id: string,@Body() updateCvDto: UpdateCvDto,
      @GetUser() user: User,
      ) {
    const cv = await this.cvService.update(id, updateCvDto);
    this.eventEmitter.emit(CV_EVENTS.update, {cv,user});
    return cv ;
  }

  @Delete('')
  @UseGuards(AuthGuardGuard)
   async remove(@Body('id') id: string,
               @GetUser() user: User,
               ) {
    const cv = await this.cvService.findOne(id);
    this.eventEmitter.emit(CV_EVENTS.delete, {cv,user});
    return this.cvService.remove(id);
  }
}
