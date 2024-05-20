import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CreateCondoDto } from './dto/create-condo.dto';

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
  
  @Get(':slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.condosService.findOneBySlug(slug);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.condosService.findOne(+id);
  // }

  @Post(':condoId/users/:userId')
  addUser(@Param('condoId') condoId: string, @Param('userId') userId: string, @Body() body: AddUserToCondoDto) {
    return this.condosService.addOrUpdateUser(+condoId, +userId, body);
  }
  
  @Get(':condoId/users/:userId')
  findCondoToUser(@Param('condoId') condoId: string, @Param('userId') userId: string) {
    return this.condosService.findCondoToUser(+condoId, +userId);
  }

  @Delete(':condoId/users/:userId')
  removeUser(@Param('condoId') condoId: string, @Param('userId') userId: string) {
    return this.condosService.removeUser(+condoId, +userId);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCondoDto: UpdateCondoDto) {
  //   return this.condosService.update(+id, updateCondoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.condosService.remove(+id);
  // }
}
