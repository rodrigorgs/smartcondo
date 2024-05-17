import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CreateCondoDto } from './dto/create-condo.dto';
import { UpdateCondoDto } from './dto/update-condo.dto';

@Controller('condos')
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  @Post()
  create(@Body() createCondoDto: CreateCondoDto) {
    return this.condosService.create(createCondoDto);
  }

  @Get()
  findAll() {
    return this.condosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondoDto: UpdateCondoDto) {
    return this.condosService.update(+id, updateCondoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condosService.remove(+id);
  }
}
