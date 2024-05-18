import { Injectable } from '@nestjs/common';
import { CreateCondoDto } from './dto/create-condo.dto';
import { UpdateCondoDto } from './dto/update-condo.dto';
import { Repository } from 'typeorm';
import { Condo } from './entities/condo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CondoToUser } from './entities/condo-to-user.entity';

@Injectable()
export class CondosService {
  constructor(
    @InjectRepository(Condo) private condosRepository: Repository<Condo>,
    @InjectRepository(CondoToUser) private condoToUsersRepository: Repository<CondoToUser>
  ) {}

  create(createCondoDto: CreateCondoDto) {
    const condo = this.condosRepository.create(createCondoDto);
    return this.condosRepository.save(condo);
  }

  findAll() {
    return this.condosRepository.find();
  }

  findOne(id: number) {
    return this.condosRepository.findOneBy({ id });
  }

  findOneBySlug(slug: string) {
    return this.condosRepository.findOne({ where: { slug } });
  }

  findCondoToUser(condoId: number, userId: number) {
    return this.condoToUsersRepository.findOne({ where: { user: { id: userId }, condo: { id: condoId } }, relations: ['condo', 'user'] });
  }

  async addOrUpdateUser(condoId: number, userId: number, dto: AddUserToCondoDto) {
    let condoToUser = await this.findCondoToUser(condoId, userId);
    if (condoToUser) {
      condoToUser = { ...condoToUser, ...dto };
    } else {
      condoToUser = this.condoToUsersRepository.create({ condo: { id: condoId }, user: { id: userId }, ...dto });
    }
    return this.condoToUsersRepository.save(condoToUser);
  }

  removeUser(condoId: number, userId: number) {
    return this.condoToUsersRepository.delete({ condo: { id: condoId }, user: { id: userId } });
  }
  
  // update(id: number, updateCondoDto: UpdateCondoDto) {
  //   return `This action updates a #${id} condo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} condo`;
  // }
}
