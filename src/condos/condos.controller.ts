import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { CondosService } from './condos.service';
import { CreateCondoDto } from './dto/create-condo.dto';
import { OptionalJwtAuthGuard } from 'auth/guard/optional-jwt.guard';
import { Public } from 'auth/public.decorator';
import { CurrentUser } from 'common/current-user.decorator';
import { User } from 'users/entities/user.entity';

@Controller('condos')
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  @Post()
  create(
    @Body() createCondoDto: CreateCondoDto,
    @CurrentUser() currentUser: User | null,
  ) {
    if (!currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.create(createCondoDto);
  }

  @Get()
  findAll(@CurrentUser() currentUser: User | null) {
    if (!currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.findAll();
  }

  @Get(':slug')
  @UseGuards(OptionalJwtAuthGuard)
  @Public()
  async findOneBySlug(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: User | null,
  ) {
    const condoToUser = await this.condosService.findCondoToUserBySlug(
      slug,
      currentUser?.id,
    );
    if (!condoToUser && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }

    return this.condosService.findOneBySlug(slug);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.condosService.findOne(+id);
  // }

  @Post(':slug/users/:userId')
  async addUser(
    @Param('slug') slug: string,
    @Param('userId') userId: string,
    @Body() body: AddUserToCondoDto,
    @CurrentUser() currentUser: User | null,
  ) {
    const condoToUser = await this.condosService.findCondoToUserBySlug(
      slug,
      currentUser?.id,
    );
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.addOrUpdateUser(
      +condoToUser.condo.id,
      +userId,
      body,
    );
  }

  @Get(':slug/users/:userId')
  async findCondoToUser(
    @Param('slug') slug: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: User | null,
  ) {
    const condoToUser = await this.condosService.findCondoToUserBySlug(
      slug,
      currentUser?.id,
    );
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.findCondoToUser(+condoToUser.condo.id, +userId);
  }

  @Delete(':slug/users/:userId')
  async removeUser(
    @Param('slug') slug: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: User | null,
  ) {
    const condoToUser = await this.condosService.findCondoToUserBySlug(
      slug,
      currentUser?.id,
    );
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.removeUser(+condoToUser.condo.id, +userId);
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
