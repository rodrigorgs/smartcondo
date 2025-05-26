import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from './entities/access-key.entity';
import { Repository } from 'typeorm';
import { CondosService } from 'condos/condos.service';

@Injectable()
export class AccessKeysService {
  constructor(
    @InjectRepository(AccessKey) private accessKeysRepository: Repository<AccessKey>,
    private readonly condosService: CondosService,
  ) { }

  async create(condoSlug: string, createAccessKeyDto: CreateAccessKeyDto) {
    const condo = await this.condosService.findOneBySlug(condoSlug);
    if (!condo) {
      throw new HttpException('Condo not found', 404);
    }
    if (!createAccessKeyDto.userId) {
      throw new BadRequestException('User ID is required');
    }
    if (createAccessKeyDto.validFrom && createAccessKeyDto.validTo) {
      if (
        new Date(createAccessKeyDto.validFrom) >=
        new Date(createAccessKeyDto.validTo)
      ) {
        throw new BadRequestException(
          'ValidFrom date must be before validTo date',
        );
      }
    }

    const keyString = Math.random().toString(36).substring(2, 15);
    const objToCreate = {
      ...createAccessKeyDto,
      keyString,
      user: { id: createAccessKeyDto.userId },
      condo: { id: condo.id },
    };
    const accessKey = this.accessKeysRepository.create(objToCreate);
    return this.accessKeysRepository.save(accessKey);
  }

  findByCondoSlugAndUser(condoSlug: string, userId: number) {
    return this.accessKeysRepository.find({
      where: {
        user: { id: userId },
        condo: { slug: condoSlug }
      }
    });
  }
  findByCondoSlug(condoSlug: string) {
    return this.accessKeysRepository.find({ where: { condo: { slug: condoSlug } } });
  }

  findByCondoAndKey(condoId: number, keyString: string) {
    return this.accessKeysRepository.findOne({ where: { condo: { id: condoId }, keyString } });
  }

  findByCondoSlugAndKey(condoSlug: string, keyString: string) {
    return this.accessKeysRepository.findOne({
      where: { condo: { slug: condoSlug }, keyString },
      relations: ['user'],
    });
  }

  async findByKey(keyString: string) {
    return this.accessKeysRepository.findOne({
      where: { keyString },
      relations: ['condo'],
    });
  }

  findAll() {
    return this.accessKeysRepository.find();
  }

  findOne(id: number) {
    return this.accessKeysRepository.findBy({ id });
  }

  remove(id: number) {
    return this.accessKeysRepository.softDelete(id);
  }
}
