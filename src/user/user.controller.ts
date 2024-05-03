import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserSubscribeDto} from "./dto/create-UserSubscribeDto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('/subscribe')
  subscribe(@Body() userSubscribeDto: UserSubscribeDto) {
    return this.userService.subscribe(userSubscribeDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('usernames')
  async findAllAsUser() {
    const users = await  this.userService.findAll();
    const usernames = users.map(user => user.username);
    return usernames;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
