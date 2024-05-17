import { Injectable } from '@nestjs/common';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from './entities/access-key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessKeysService {
  constructor(
    @InjectRepository(AccessKey) private accessKeysRepository: Repository<AccessKey>,
  ) {}

  create(createAccessKeyDto: CreateAccessKeyDto) {
    const keyString = Math.random().toString(36).substring(2, 15);
    const accessKey = this.accessKeysRepository.create({...createAccessKeyDto, keyString });
    return this.accessKeysRepository.save(accessKey);
  }

  findByCondo(condoId: number) {
    return this.accessKeysRepository.find({ where: { condo: { id: condoId } } });
  }

  findByCondoAndKey(condoId: number, keyString: string) {
    return this.accessKeysRepository.findOne({ where: { condo: { id: condoId }, keyString } });
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
