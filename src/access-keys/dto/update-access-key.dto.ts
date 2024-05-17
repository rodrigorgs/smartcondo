import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessKeyDto } from './create-access-key.dto';

export class UpdateAccessKeyDto extends PartialType(CreateAccessKeyDto) {}
