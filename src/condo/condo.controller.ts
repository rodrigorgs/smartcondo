import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';

@Controller('condo')
export class CondoController {
  @Get()
  @Public()
  findAll() {
    return 'This action returns all condos';
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return `This action returns a ${slug} condo`;
  }
}
