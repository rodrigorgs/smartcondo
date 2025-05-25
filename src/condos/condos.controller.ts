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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserToCondoDto } from './dto/add-user-to-condo.dto';

@ApiTags('Condos')
@Controller('condos')
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  async getEntities(condoSlug: string, user: User | null) {
    const condo = await this.condosService.findOneBySlug(condoSlug);
    const condoToUser = user
      ? await this.condosService.findCondoToUser(+condo.id, user.id)
      : null;
    return { condo, condoToUser };
  }

  @Get()
  @ApiOperation({
    summary: 'List all condos that the current user has access to',
  })
  async findAll(@CurrentUser() currentUser: User | null) {
    if (currentUser?.isAdmin) {
      return this.condosService.findAll();
    }
    if (currentUser) {
      return this.condosService.findByUser(currentUser.id);
    }
    throw new ForbiddenException();
  }

  @Post()
  @ApiOperation({ summary: 'Create condo' })
  create(
    @Body() createCondoDto: CreateCondoDto,
    @CurrentUser() currentUser: User | null,
  ) {
    if (!currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.create(createCondoDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get one condo' })
  @UseGuards(OptionalJwtAuthGuard)
  @Public()
  async findOneBySlug(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: User | null,
  ) {
    // const { condoToUser } = await this.getEntities(slug, currentUser);
    // if (!condoToUser && !currentUser?.isAdmin) {
    //   throw new ForbiddenException();
    // }

    return this.condosService.findOneBySlug(slug);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.condosService.findOne(+id);
  // }

  @Get(':slug/users')
  @ApiOperation({ summary: 'Get users in condo' })
  async findUsers(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: User | null,
  ) {
    const { condo, condoToUser } = await this.getEntities(slug, currentUser);
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.findUsers(condo.id);
  }
  
  @Get(':slug/users/:userId')
  @ApiOperation({ summary: 'Get info about user in condo' })
  async findCondoToUser(
    @Param('slug') slug: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: User | null,
  ) {
    const { condo, condoToUser } = await this.getEntities(slug, currentUser);
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.findCondoToUser(+condo.id, +userId);
  }

  @Post(':slug/users/email/:email')
  @ApiOperation({ summary: 'Add user to condo by email' })
  async addUserByEmail(
    @Param('slug') slug: string,
    @Param('email') email: string,
    @Body() body: AddUserToCondoDto,
    @CurrentUser() currentUser: User | null,
  ) {
    const { condo, condoToUser } = await this.getEntities(slug, currentUser);
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.addUserByEmail(slug, email, body);
  }

  @Post(':slug/users/:userId')
  @ApiOperation({ summary: 'Add user to condo' })
  async addUser(
    @Param('slug') slug: string,
    @Param('userId') userId: string,
    @Body() body: AddUserToCondoDto,
    @CurrentUser() currentUser: User | null,
  ) {
    const { condo, condoToUser } = await this.getEntities(slug, currentUser);
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.addOrUpdateUser(+condo.id, +userId, body);
  }


  @Delete(':slug/users/:userId')
  @ApiOperation({ summary: 'Remove user from condo' })
  async removeUser(
    @Param('slug') slug: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: User | null,
  ) {
    const { condo, condoToUser } = await this.getEntities(slug, currentUser);
    if (!condoToUser?.isManager && !currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.condosService.removeUser(+condo.id, +userId);
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
