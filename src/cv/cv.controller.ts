import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {AuthGuardGuard} from "../user/auth-guard/auth-guard.guard";
import {EventEmitter2} from "@nestjs/event-emitter";
import {CV_EVENTS} from "./cv.events.config";

@Controller('cv')
export class CvController {
  constructor(
      private readonly cvService: CvService ,
      private eventEmitter: EventEmitter2
  ) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto) {
    const cv = await  this.cvService.create(createCvDto);
    const userId = cv.user.id;
    this.eventEmitter.emit(CV_EVENTS.add, {cv,userId});
    return cv ;
  }

  @Post('addCv')
  @UseGuards(AuthGuardGuard)
  async addCv(
      @Body() createCvDto: CreateCvDto,
      @Req() request: Request,
  ) {
    return this.cvService.create(createCvDto);
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

  @Get('/ById')
  findOne(@Body('id') id: string) {
    return this.cvService.findOne(id);
  }

  @Patch('/ById')
  async update(@Body('id') id: string,@Body() updateCvDto: UpdateCvDto) {
    const cv = await this.cvService.update(id, updateCvDto);
    const userId = cv.user.id;
    this.eventEmitter.emit(CV_EVENTS.update, {cv,userId});
    return cv ;
  }

  @Delete('')
  @UseGuards(AuthGuardGuard)
  async remove(@Body('id') id: string) {
    const cv = await this.cvService.findOne(id);
    const userId = cv.user.id;
    this.eventEmitter.emit(CV_EVENTS.delete, {cv,userId});
    return this.cvService.remove(id);
  }
}
