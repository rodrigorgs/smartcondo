import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'common/current-user.decorator';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    description: 'Create user',
    type: CreateUserDto,
  })
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: User | null,
  ) {
    if (!currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@CurrentUser() currentUser: User | null) {
    if (!currentUser?.isAdmin) {
      throw new ForbiddenException();
    }
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() currentUser: User | null) {
    if (!currentUser?.isAdmin && currentUser.id !== +id) {
      throw new ForbiddenException();
    }
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
