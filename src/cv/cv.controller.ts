import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get()
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

  @Get('/ByUser/:id')
  async findByUserId(@Param('id') id: string) {
    const cvs = await this.cvService.findAll({ relations: ['user'] });
    return cvs.filter(cv => cv.user?.id === id); // Use optional chaining to avoid errors if user is undefined
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(id);
  }
}
